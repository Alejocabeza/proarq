import React, { useEffect, useRef, useState, useCallback } from "react";
import Select, { MultiValue, SingleValue, StylesConfig } from "react-select";
import { debounce } from "lodash";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { formatCurrency } from "@app/lib/format-currency";

interface Option {
  value: string;
  label: string;
}

interface SelectLoaderProps {
  id: string;
  initialValue?: Option | null;
  optionLabel?: string | [string, string];
  options?: Option[];
  apiPath?: string;
  isMulti?: boolean;
  disabled?: boolean;
  placeholder?: string;
  dependsOn?: string;
  onChange: (option: Option | null) => void;
  state?: Record<string, any>;
}

export const SelectLoader: React.FC<SelectLoaderProps> = ({
  id,
  apiPath,
  initialValue = null,
  optionLabel,
  options,
  isMulti = false,
  disabled = false,
  placeholder,
  dependsOn,
  state = {},
  onChange,
}) => {
  const t = useTranslations();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(disabled);
  const [allData, setAllData] = useState<Option[]>(options || []);
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    initialValue,
  );
  const currentPage = useRef(1);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const clearValue: Option = {
    value: "",
    label: t("general.none"),
  };

  const fetchOptions = useCallback(
    async (page: number = 1, inputValue?: string) => {
      if (!apiPath || !session?.user?.access_token) return;

      try {
        setIsLoading(true);
        const params = new URLSearchParams({
          limit: "20",
          offset: page.toString(),
          ...(dependsOn && state[dependsOn]
            ? { [dependsOn]: state[dependsOn] }
            : {}),
        });

        const response = await fetch(
          `${API_URL}${apiPath}?${params.toString()}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.user.access_token}`,
            },
          },
        );

        const data = await response.json();
        const newOptions = data.data.map((item: any) => ({
          label: optionLabel
            ? Array.isArray(optionLabel)
              ? `${item[optionLabel[0]]} [${formatCurrency(item[optionLabel[1]])}]`
              : item[optionLabel]
            : item.name,
          value: item.id,
        }));

        setAllData((prev) =>
          page === 1 ? [clearValue, ...newOptions] : [...prev, ...newOptions],
        );
        currentPage.current = page;
      } catch (error) {
        console.error("Failed to fetch options:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [API_URL, apiPath, dependsOn, optionLabel, session, state],
  );

  useEffect(() => {
    if (status === "authenticated" && !options) {
      fetchOptions(1);
    }
  }, [status, options]);

  useEffect(() => {
    if (dependsOn && state[dependsOn] === undefined) {
      setIsDisabled(true);
      setAllData([clearValue]);
    } else if (dependsOn && state[dependsOn]) {
      setIsDisabled(false);
      fetchOptions(1);
    }
  }, [dependsOn, state]);

  const handleChange = (option: SingleValue<Option> | MultiValue<Option>) => {
    if (isMulti) {
      onChange(option as Option | null); // For multi-select
    } else {
      const selected = option as SingleValue<Option>;
      setSelectedOption(selected);
      onChange(selected || clearValue);
    }
  };

  const handleLoadMore = debounce(() => {
    fetchOptions(currentPage.current + 1);
  }, 300);

  const customStyles: StylesConfig<Option, boolean> = {
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  };

  return (
    <Select
      id={id}
      value={selectedOption}
      onChange={handleChange}
      options={allData}
      isMulti={isMulti}
      isClearable
      isLoading={isLoading}
      isDisabled={isLoading || isDisabled}
      placeholder={placeholder || t("general.select")}
      onMenuScrollToBottom={handleLoadMore}
      menuPortalTarget={document.body}
      styles={customStyles}
    />
  );
};
