import xss from "xss";

// دالة تساعد على تنظيف أي object (body, query, params)
const sanitizeObject = (obj) => {
  if (!obj) return;
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "string") {
      obj[key] = xss(obj[key]); // تنظيف النصوص
    } else if (typeof obj[key] === "object") {
      sanitizeObject(obj[key]); // recursive للتعمق
    }
  });
};

export const sanitizeMiddleware = (req, res, next) => {
  sanitizeObject(req.body);
  sanitizeObject(req.query);
  sanitizeObject(req.params);
  next();
};
