"use client";

import { Label } from "@app/components/ui/label";
import React from "react";
import { useForm } from "react-hook-form";

export const SettingForm = () => {
  const {} = useForm();
  return (
    <form>
      <div className="space-y-2">
        <Label htmlFor="locale">Locale</Label>
      </div>
    </form>
  );
};
