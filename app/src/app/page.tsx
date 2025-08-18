import ButtonLink from "@app/components/ui/button-link";
import { getCurrentUser } from "@app/lib/auth/get-session";
import { CheckCircle, LayoutDashboard, LucideIcon, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function Home() {
  const session = await getCurrentUser();
  const t = await getTranslations();

  const featuresMains: { title: string; icon: LucideIcon; desc: string }[] = [
    {
      title: t("home.main_features.features.project_board.title"),
      icon: LayoutDashboard,
      desc: t("home.main_features.features.project_board.desc"),
    },
    {
      title: t("home.main_features.features.manage_clients.title"),
      icon: Users,
      desc: t("home.main_features.features.manage_clients.desc"),
    },
    {
      title: t("home.main_features.features.task_tracker.title"),
      icon: CheckCircle,
      desc: t("home.main_features.features.task_tracker.desc"),
    },
  ];

  return (
    <section className="flex flex-col min-h-screen max-w-[1200px] mx-auto">
      <header className="px-4 lg-:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center justify-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-stack-2 bg-black text-white rounded p-1"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 4l-8 4l8 4l8 -4l-8 -4" />
            <path d="M4 12l8 4l8 -4" />
            <path d="M4 16l8 4l8 -4" />
          </svg>
          {process.env.NEXT_PUBLIC_APP_NAME}
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <ul className="flex flex-row gap-2">
            {session ? (
              <li>
                <Link
                  href="/login"
                  className="bg-gray-200 rounded p-2 transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
                >
                  {t("general.dashboard")}
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    href="/login"
                    className="bg-gray-200 rounded p-2 transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
                  >
                    {t("general.login")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="bg-gray-200 rounded p-2 transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
                  >
                    {t("general.register")}
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center items-center">
          <div className="container px-4 md:px-6 w-[70%]">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-5xl/none">
                  {t("home.welcome")}
                </h1>
              </div>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                {t("home.description")}
              </p>
              <div className="space-x-4">
                <ButtonLink
                  className="bg-primary text-primary-foreground p-2 rounded"
                  value={t("general.started_free")}
                  href="/register"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100/20 dark:bg-gray-800 flex justify-center items-center">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              {t("home.main_features.title")}
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              {featuresMains.map(({ title, icon: Icon, desc }, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center"
                >
                  {Icon && <Icon className="h-12 w-12 mb-4 text-primary" />}
                  <h3 className="text-lg font-bold">{title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 flex justify-center items-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  {t("home.join_now", {
                    app_name: process.env.NEXT_PUBLIC_APP_NAME,
                  })}
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  {t("home.started_now")}
                </p>
              </div>
              <ButtonLink
                className="bg-primary text-primary-foreground p-2 rounded"
                value={t("general.register")}
                href="/register"
              />
            </div>
          </div>
        </section>
      </main>
    </section>
  );
}
