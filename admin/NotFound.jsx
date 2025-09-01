import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { Button, Result } from "antd";

const NotFound = () => {
  return (
    // <div className="flex items-center justify-center h-screen w-full bg-gray-100">
    //   <motion.div
    //     initial={{ opacity: 0, y: -50 }}
    //     animate={{ opacity: 1, y: 0 }}
    //     transition={{ duration: 0.8 }}
    //     className="text-center"
    //   >
    //     <motion.h1
    //       initial={{ scale: 0 }}
    //       animate={{ scale: 1 }}
    //       transition={{ type: "spring", stiffness: 120, delay: 0.3 }}
    //       className="text-8xl font-extrabold text-red-600 drop-shadow-lg"
    //     >
    //       404
    //     </motion.h1>

    //     <motion.p
    //       initial={{ opacity: 0 }}
    //       animate={{ opacity: 1 }}
    //       transition={{ delay: 0.6 }}
    //       className="text-2xl mt-4 text-gray-700"
    //     >
    //
    //     </motion.p>

    //     <motion.div
    //       initial={{ opacity: 0, y: 20 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ delay: 1 }}
    //     >
    //       <Link
    //         to="/"
    //         className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white text-lg rounded-xl shadow-md hover:bg-blue-700 transition"
    //       >
    //         الرجوع للرئيسية
    //       </Link>
    //     </motion.div>
    //   </motion.div>
    // </div>

    <div className="flex justify-center items-center h-screen w-full">
      <Result
        status="404"
        title="404"
        subTitle="المعزرة , الصفحة غير موجودة"
        extra={
          <Link
            to="/"
            className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white text-lg rounded-xl shadow-md hover:bg-blue-700 transition"
          >
            الرجوع للرئيسية
          </Link>
        }
      />
    </div>
  );
};

export default NotFound;
