import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const appointmentId = searchParams.get("appointmentId");

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        await axios.post("/api/user/confirm-payment", { appointmentId });
        toast.success("تم الدفع بنجاح ✅");
      } catch (err) {
        console.log(err);
        toast.error("حصل خطأ في تأكيد الدفع");
      }
    };
    if (appointmentId) confirmPayment();
  }, [appointmentId]);

  return (
    <div className="flex items-center justify-center h-screen">
      <h2 className="text-green-600 text-2xl">تم الدفع بنجاح 🎉</h2>
    </div>
  );
};

export default PaymentSuccess;
