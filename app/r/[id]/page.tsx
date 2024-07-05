"use client";
import { LoadingSpinner } from "@/components/loading-spinner";
import { getRequest } from "@/services/request.service";
import sendTopupContext from "@/states/send-topup-context";
import userContext from "@/states/user-context";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Request() {
  const params = useParams();
  const { sendTopup, setSendTopup } = useContext(sendTopupContext);
  const router = useRouter();
  const {
    user: { token, user },
  } = useContext(userContext);

  useEffect(() => {
    if (params.id) {
      if (!token) {
        router.push(`/signup?requestId=${params.id}`);
      } else {
        getRequest(params.id as string, token).then((d) => {
          setSendTopup({
            from: user.phoneNumber,
            to: d?.senderPhoneNumber as string,
            fromCountryCode: "US",
            product: undefined,
            topupFrequency: undefined,
          });
        });
        router.push(`/send-topup/options`);
      }
    }
  }, [params, user, token]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}
