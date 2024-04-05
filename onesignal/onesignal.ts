import OneSignal from "react-onesignal";

export async function runOneSignal() {
  await OneSignal.init({
    appId: "3956aa18-94e6-4aa0-83a3-585420692321",
    allowLocalhostAsSecureOrigin: true,
  });
  OneSignal.Slidedown.promptPush();
}
