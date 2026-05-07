import { Link } from "react-router-dom";
import { Ghost, ArrowLeft } from "lucide-react";
import { AppButton } from "@/shared/components/ui/button/AppButton";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 font-sans p-6 text-center">
      <div className="flex flex-col items-center space-y-6 max-w-md">
        <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-slate-100 shadow-sm border border-slate-200">
          <Ghost size={48} className="text-slate-400 animate-pulse" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            404
          </h1>
          <h2 className="text-xl font-semibold text-slate-700">
            Page not found
          </h2>
          <p className="text-slate-500 text-sm">
            Sorry, we couldn't find the page you're looking for. It might have
            been moved, deleted, or never existed.
          </p>
        </div>

        <AppButton asChild variant="default" className="mt-8 select-none">
          <Link to="/dashboard" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
        </AppButton>
      </div>
    </div>
  );
}
