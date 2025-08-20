import appointment_img from "./appointment_img.png";
import header_img from "./header_img.png";
import group_profiles from "./group_profiles.png";
import profile_pic from "./profile_pic.png";
import contact_image from "./contact_image.png";
import about_image from "./about_image.png";
//import logo from "./logo.svg";
import dropdown_icon from "./dropdown_icon.svg";
import menu_icon from "./menu_icon.svg";
import cross_icon from "./cross_icon.png";
import chats_icon from "./chats_icon.svg";
import verified_icon from "./verified_icon.svg";
import arrow_icon from "./arrow_icon.svg";
import info_icon from "./info_icon.svg";
import upload_icon from "./upload_icon.png";
import stripe_logo from "./stripe_logo.png";
import razorpay_logo from "./razorpay_logo.png";
import doc1 from "./doc1.png";
import doc2 from "./doc2.png";
import doc3 from "./doc3.png";
import doc4 from "./doc4.png";
import doc5 from "./doc5.png";
import doc6 from "./doc6.png";
import doc7 from "./doc7.png";
import doc8 from "./doc8.png";
import doc9 from "./doc9.png";
import doc10 from "./doc10.png";
import doc11 from "./doc11.png";
import doc12 from "./doc12.png";
import doc13 from "./doc13.png";
import doc14 from "./doc14.png";
import doc15 from "./doc15.png";
import Dermatologist from "./Dermatologist.svg";
import Gastroenterologist from "./Gastroenterologist.svg";
import General_physician from "./General_physician.svg";
import Gynecologist from "./Gynecologist.svg";
import Neurologist from "./Neurologist.svg";
import Pediatricians from "./Pediatricians.svg";
import logo from "./logo.svg";

export const assets = {
  appointment_img,
  header_img,
  group_profiles,
  logo,
  chats_icon,
  verified_icon,
  info_icon,
  profile_pic,
  arrow_icon,
  contact_image,
  about_image,
  menu_icon,
  cross_icon,
  dropdown_icon,
  upload_icon,
  stripe_logo,
  razorpay_logo,
};

export const specialityData = [
  {
    speciality: "طبيب عام",
    image: General_physician,
  },
  {
    speciality: "طبيب أمراض نساء وولاده",
    image: Gynecologist,
  },
  {
    speciality: "طبيب أمراض جلدية",
    image: Dermatologist,
  },
  {
    speciality: "طبيب أطفال",
    image: Pediatricians,
  },
  {
    speciality: "طبيب مخ و أعصاب",
    image: Neurologist,
  },
  {
    speciality: "طبيب أمراض الجهاز الهضمي",
    image: Gastroenterologist,
  },
];

export const doctors = [
  {
    _id: "doc1",
    name: "د. أحمد عبد الرحمن",
    image: doc1,
    speciality: "طبيب عام",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "يتمتع الدكتور بخبرة متميزة في تقديم رعاية طبية شاملة، مع التركيز على الطب الوقائي، والتشخيص المبكر، ووضع خطط علاج فعالة لضمان أفضل النتائج الصحية للمرضى. يحرص دائمًا على الاستماع الجيد لمشاكل المرضى وتقديم حلول طبية مبنية على أحدث الأبحاث والمعايير العالمية، كما يسعى إلى بناء علاقة مبنية على الثقة والاحترام المتبادل لضمان تجربة علاجية مريحة وفعّالة",
    fees: 50,
    address: {
      line1: "17th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc2",
    name: "د. نهى عبد العزيز",
    image: doc2,
    speciality: "طبيب أمراض نساء وولاده",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "يتمتع الدكتور بخبرة متميزة في تقديم رعاية طبية شاملة، مع التركيز على الطب الوقائي، والتشخيص المبكر، ووضع خطط علاج فعالة لضمان أفضل النتائج الصحية للمرضى. يحرص دائمًا على الاستماع الجيد لمشاكل المرضى وتقديم حلول طبية مبنية على أحدث الأبحاث والمعايير العالمية، كما يسعى إلى بناء علاقة مبنية على الثقة والاحترام المتبادل لضمان تجربة علاجية مريحة وفعّالة",
    fees: 60,
    address: {
      line1: "27th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc3",
    name: " د. محمد فؤاد",
    image: doc3,
    speciality: "طبيب أمراض جلدية",
    degree: "MBBS",
    experience: "1 Years",
    about:
      "يتمتع الدكتور بخبرة متميزة في تقديم رعاية طبية شاملة، مع التركيز على الطب الوقائي، والتشخيص المبكر، ووضع خطط علاج فعالة لضمان أفضل النتائج الصحية للمرضى. يحرص دائمًا على الاستماع الجيد لمشاكل المرضى وتقديم حلول طبية مبنية على أحدث الأبحاث والمعايير العالمية، كما يسعى إلى بناء علاقة مبنية على الثقة والاحترام المتبادل لضمان تجربة علاجية مريحة وفعّالة",
    fees: 30,
    address: {
      line1: "37th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc4",
    name: " د. كريم حسن",
    image: doc4,
    speciality: "طبيب أطفال",
    degree: "MBBS",
    experience: "2 Years",
    about:
      "يتمتع الدكتور بخبرة متميزة في تقديم رعاية طبية شاملة، مع التركيز على الطب الوقائي، والتشخيص المبكر، ووضع خطط علاج فعالة لضمان أفضل النتائج الصحية للمرضى. يحرص دائمًا على الاستماع الجيد لمشاكل المرضى وتقديم حلول طبية مبنية على أحدث الأبحاث والمعايير العالمية، كما يسعى إلى بناء علاقة مبنية على الثقة والاحترام المتبادل لضمان تجربة علاجية مريحة وفعّالة",
    fees: 40,
    address: {
      line1: "47th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc5",
    name: "د. سارة خالد",
    image: doc5,
    speciality: "طبيب مخ و أعصاب",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "يتمتع الدكتور بخبرة متميزة في تقديم رعاية طبية شاملة، مع التركيز على الطب الوقائي، والتشخيص المبكر، ووضع خطط علاج فعالة لضمان أفضل النتائج الصحية للمرضى. يحرص دائمًا على الاستماع الجيد لمشاكل المرضى وتقديم حلول طبية مبنية على أحدث الأبحاث والمعايير العالمية، كما يسعى إلى بناء علاقة مبنية على الثقة والاحترام المتبادل لضمان تجربة علاجية مريحة وفعّالة",
    fees: 50,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc6",
    name: "د. يوسف محمود",
    image: doc6,
    speciality: "طبيب أمراض الجهاز الهضمي",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "يتمتع الدكتور بخبرة متميزة في تقديم رعاية طبية شاملة، مع التركيز على الطب الوقائي، والتشخيص المبكر، ووضع خطط علاج فعالة لضمان أفضل النتائج الصحية للمرضى. يحرص دائمًا على الاستماع الجيد لمشاكل المرضى وتقديم حلول طبية مبنية على أحدث الأبحاث والمعايير العالمية، كما يسعى إلى بناء علاقة مبنية على الثقة والاحترام المتبادل لضمان تجربة علاجية مريحة وفعّالة",
    fees: 50,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc7",
    name: "د. طارق السيد",
    image: doc7,
    speciality: "طبيب عام",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "يتمتع الدكتور بخبرة متميزة في تقديم رعاية طبية شاملة، مع التركيز على الطب الوقائي، والتشخيص المبكر، ووضع خطط علاج فعالة لضمان أفضل النتائج الصحية للمرضى. يحرص دائمًا على الاستماع الجيد لمشاكل المرضى وتقديم حلول طبية مبنية على أحدث الأبحاث والمعايير العالمية، كما يسعى إلى بناء علاقة مبنية على الثقة والاحترام المتبادل لضمان تجربة علاجية مريحة وفعّالة",
    fees: 50,
    address: {
      line1: "17th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc8",
    name: "د. عمرو عبد الفتاح",
    image: doc8,
    speciality: "طبيب أمراض نساء وولاده",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "يتمتع الدكتور بخبرة متميزة في تقديم رعاية طبية شاملة، مع التركيز على الطب الوقائي، والتشخيص المبكر، ووضع خطط علاج فعالة لضمان أفضل النتائج الصحية للمرضى. يحرص دائمًا على الاستماع الجيد لمشاكل المرضى وتقديم حلول طبية مبنية على أحدث الأبحاث والمعايير العالمية، كما يسعى إلى بناء علاقة مبنية على الثقة والاحترام المتبادل لضمان تجربة علاجية مريحة وفعّالة",
    fees: 60,
    address: {
      line1: "27th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc9",
    name: "د. منى السيد",
    image: doc9,
    speciality: "طبيب أمراض جلدية",
    degree: "MBBS",
    experience: "1 Years",
    about:
      "يتمتع الدكتور بخبرة متميزة في تقديم رعاية طبية شاملة، مع التركيز على الطب الوقائي، والتشخيص المبكر، ووضع خطط علاج فعالة لضمان أفضل النتائج الصحية للمرضى. يحرص دائمًا على الاستماع الجيد لمشاكل المرضى وتقديم حلول طبية مبنية على أحدث الأبحاث والمعايير العالمية، كما يسعى إلى بناء علاقة مبنية على الثقة والاحترام المتبادل لضمان تجربة علاجية مريحة وفعّالة",
    fees: 30,
    address: {
      line1: "37th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc10",
    name: "د. مازن إبراهيم",
    image: doc10,
    speciality: "طبيب أطفال",
    degree: "MBBS",
    experience: "2 Years",
    about:
      "يتمتع الدكتور بخبرة متميزة في تقديم رعاية طبية شاملة، مع التركيز على الطب الوقائي، والتشخيص المبكر، ووضع خطط علاج فعالة لضمان أفضل النتائج الصحية للمرضى. يحرص دائمًا على الاستماع الجيد لمشاكل المرضى وتقديم حلول طبية مبنية على أحدث الأبحاث والمعايير العالمية، كما يسعى إلى بناء علاقة مبنية على الثقة والاحترام المتبادل لضمان تجربة علاجية مريحة وفعّالة",
    fees: 40,
    address: {
      line1: "47th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc11",
    name: " د. ريم مصطفى",
    image: doc11,
    speciality: "طبيب مخ و أعصاب",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "يتمتع الدكتور بخبرة متميزة في تقديم رعاية طبية شاملة، مع التركيز على الطب الوقائي، والتشخيص المبكر، ووضع خطط علاج فعالة لضمان أفضل النتائج الصحية للمرضى. يحرص دائمًا على الاستماع الجيد لمشاكل المرضى وتقديم حلول طبية مبنية على أحدث الأبحاث والمعايير العالمية، كما يسعى إلى بناء علاقة مبنية على الثقة والاحترام المتبادل لضمان تجربة علاجية مريحة وفعّالة",
    fees: 50,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc12",
    name: "د. سامي عبد الله",
    image: doc12,
    speciality: "طبيب مخ و أعصاب",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "يتمتع الدكتور بخبرة متميزة في تقديم رعاية طبية شاملة، مع التركيز على الطب الوقائي، والتشخيص المبكر، ووضع خطط علاج فعالة لضمان أفضل النتائج الصحية للمرضى. يحرص دائمًا على الاستماع الجيد لمشاكل المرضى وتقديم حلول طبية مبنية على أحدث الأبحاث والمعايير العالمية، كما يسعى إلى بناء علاقة مبنية على الثقة والاحترام المتبادل لضمان تجربة علاجية مريحة وفعّالة",
    fees: 50,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc13",
    name: "د. دعاء عبد العليم",
    image: doc13,
    speciality: "طبيب عام",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "يتمتع الدكتور بخبرة متميزة في تقديم رعاية طبية شاملة، مع التركيز على الطب الوقائي، والتشخيص المبكر، ووضع خطط علاج فعالة لضمان أفضل النتائج الصحية للمرضى. يحرص دائمًا على الاستماع الجيد لمشاكل المرضى وتقديم حلول طبية مبنية على أحدث الأبحاث والمعايير العالمية، كما يسعى إلى بناء علاقة مبنية على الثقة والاحترام المتبادل لضمان تجربة علاجية مريحة وفعّالة",
    fees: 50,
    address: {
      line1: "17th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc14",
    name: "د. شريف جمال",
    image: doc14,
    speciality: "طبيب أمراض نساء وولاده",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "يتمتع الدكتور بخبرة متميزة في تقديم رعاية طبية شاملة، مع التركيز على الطب الوقائي، والتشخيص المبكر، ووضع خطط علاج فعالة لضمان أفضل النتائج الصحية للمرضى. يحرص دائمًا على الاستماع الجيد لمشاكل المرضى وتقديم حلول طبية مبنية على أحدث الأبحاث والمعايير العالمية، كما يسعى إلى بناء علاقة مبنية على الثقة والاحترام المتبادل لضمان تجربة علاجية مريحة وفعّالة",
    fees: 60,
    address: {
      line1: "27th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc15",
    name: "د. هبة طارق",
    image: doc15,
    speciality: "طبيب أمراض جلدية",
    degree: "MBBS",
    experience: "1 Years",
    about:
      "يتمتع الدكتور بخبرة متميزة في تقديم رعاية طبية شاملة، مع التركيز على الطب الوقائي، والتشخيص المبكر، ووضع خطط علاج فعالة لضمان أفضل النتائج الصحية للمرضى. يحرص دائمًا على الاستماع الجيد لمشاكل المرضى وتقديم حلول طبية مبنية على أحدث الأبحاث والمعايير العالمية، كما يسعى إلى بناء علاقة مبنية على الثقة والاحترام المتبادل لضمان تجربة علاجية مريحة وفعّالة",
    fees: 30,
    address: {
      line1: "37th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
];
