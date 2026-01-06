
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardRedirect() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/auth?mode=login");
    }

    const role = user.user_metadata?.role;

    if (role === "provider") {
        redirect("/dashboard/provider");
    } else {
        // Default to customer layout if role is missing or customer
        redirect("/dashboard/customer");
    }
}
