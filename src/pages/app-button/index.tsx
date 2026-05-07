import { AppButton } from "@/shared/components/ui/button/AppButton";

export default function AppButtonPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">App Button</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Shadcn UI button component examples.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
        <h3 className="font-semibold mb-4 text-neutral-800">Variants</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <AppButton variant="default">Default Button</AppButton>
          <AppButton variant="secondary">Secondary</AppButton>
          <AppButton variant="destructive">Destructive</AppButton>
          <AppButton variant="outline">Outline</AppButton>
          <AppButton variant="ghost">Ghost Button</AppButton>
          <AppButton variant="link">Link Style</AppButton>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
        <h3 className="font-semibold mb-4 text-neutral-800">Sizes</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <AppButton size="sm">Small Button</AppButton>
          <AppButton size="default">Default Size</AppButton>
          <AppButton size="lg">Large Button</AppButton>
          <AppButton size="icon">
            <span className="text-xs">Icon</span>
          </AppButton>
        </div>
      </div>
    </div>
  );
}
