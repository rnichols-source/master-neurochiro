"use client";

import { useState, useEffect } from "react";
import { Bell, BellOff, Loader2 } from "lucide-react";
import { savePushSubscription } from "@/app/actions/push-actions";

export function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      navigator.serviceWorker.ready.then((registration) => {
        registration.pushManager.getSubscription().then((sub) => {
          setSubscription(sub);
        });
      });
    }
  }, []);

  function urlBase64ToUint8Array(base64String: string) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  const subscribe = async () => {
    setLoading(true);
    try {
      const registration = await navigator.serviceWorker.ready;
      
      // Request permission
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        alert("Permission not granted for notifications");
        return;
      }

      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
        ),
      });

      setSubscription(sub);
      await savePushSubscription(JSON.parse(JSON.stringify(sub)));
    } catch (err) {
      console.error("Failed to subscribe:", err);
    } finally {
      setLoading(false);
    }
  };

  const unsubscribe = async () => {
    setLoading(true);
    try {
      await subscription?.unsubscribe();
      setSubscription(null);
      // Optional: remove from DB
    } catch (err) {
      console.error("Failed to unsubscribe:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isSupported) return null;

  return (
    <div className="p-4 border-t border-white/5 mt-auto">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {subscription ? (
            <Bell className="w-4 h-4 text-brand-orange" />
          ) : (
            <BellOff className="w-4 h-4 text-white/20" />
          )}
          <span className="text-[10px] font-black uppercase tracking-widest text-white/40">
            {subscription ? "Alerts Active" : "Alerts Off"}
          </span>
        </div>
        
        {loading ? (
          <Loader2 className="w-4 h-4 text-brand-orange animate-spin" />
        ) : (
          <button
            onClick={subscription ? unsubscribe : subscribe}
            className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded border transition-all ${
              subscription 
                ? "border-white/10 text-white/40 hover:text-white hover:bg-white/5" 
                : "border-brand-orange/50 text-brand-orange hover:bg-brand-orange hover:text-white"
            }`}
          >
            {subscription ? "Disable" : "Enable"}
          </button>
        )}
      </div>
    </div>
  );
}
