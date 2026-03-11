export interface Setting {
  id?: number;
  key: string;
  value: string;
  category: string;
  type: string;
}

export interface AppSettings {
  logo?: string;
  facebook?: string;
  x?: string;
  linkedin?: string;
  phone_1?: string;
  phone_2?: string;
  whatsapp_num_1?: string;
  whatsapp_num_2?: string;
  about?: string;
  help_center?: string;
  terms_and_conditions?: string;
  about_ar?: string;
  help_center_ar?: string;
  terms_and_conditions_ar?: string;
  telegram?: string;
  youtube?: string;
  instagram?: string;
  listening?: string;
  reading?: string;
  case?: string;
  time_of_exam?: string;
  refund_policy?: string;
  refund_policy_ar?: string;
  privacy_policy?: string;
  privacy_policy_ar?: string;
  primary_color?: string;
  secondary_color?: string;
  third_color?: string;
  logo_student?: string;
  logo_instructor?: string;
  message?: string;
  [key: string]: string | undefined;
}


/*

[
{"type":"header","version":"5.2.1","comment":"Export to JSON plugin for PHPMyAdmin"},
{"type":"database","name":"local_engli_vision"},
{"type":"table","name":"settings","database":"local_engli_vision","data":
[
{"id":"1","key":"logo","value":"settings\/8650520250714175231logo2.webp","category":"logos","type":"image","created_at":"2025-06-02 18:52:31","updated_at":"2025-07-14 20:52:31"},
{"id":"2","key":"facebook","value":"https:\/\/www.facebook.com\/Englivision","category":"social links","type":"string","created_at":"2025-06-02 18:52:31","updated_at":"2025-08-24 19:44:13"},
{"id":"3","key":"x","value":"https:\/\/www.facebook.com\/Englivision","category":"social links","type":"string","created_at":"2025-06-02 18:52:31","updated_at":"2025-08-24 19:44:23"},
{"id":"4","key":"linkedin","value":"https:\/\/www.facebook.com\/ahmed.abdelssattar.7","category":"social links","type":"string","created_at":"2025-06-02 18:52:31","updated_at":"2025-06-04 22:41:10"},
{"id":"5","key":"phone_1","value":"+ 201061567332","category":"contact","type":"string","created_at":"2025-06-02 18:52:31","updated_at":"2025-08-26 15:20:16"},
{"id":"6","key":"phone_2","value":"+ 201061567332","category":"contact","type":"string","created_at":"2025-06-02 18:52:31","updated_at":"2025-08-26 15:20:16"},
{"id":"7","key":"whatsapp_num_1","value":"201061567332","category":"whatsapp","type":"string","created_at":"2025-06-02 18:52:31","updated_at":"2025-08-25 18:21:12"},
{"id":"8","key":"whatsapp_num_2","value":"201061567332","category":"whatsapp","type":"string","created_at":"2025-06-02 18:52:31","updated_at":"2025-08-25 18:21:12"},
{"id":"9","key":"about","value":"Engli-Vision, established in 2017, provides professional education, development activities, and training to its members as well as the broader business community.\r\n\r\nEV offers business training to university students and recent graduates through both online and face-to-face courses. Engli-Vision (EV) is also proud to run online courses that have become an indispensable resource for both employers and job seekers.","category":"pages","type":"textarea","created_at":"2025-06-02 18:52:31","updated_at":"2025-08-26 14:56:58"},
{"id":"10","key":"help_center","value":"📞 Contact Us\r\n\r\n📱 Phone\/WhatsApp: +20 106 156 7332\r\n\r\n📘 Facebook: Engli-Vision\r\n\r\n📸 Instagram: engli_vision\r\n\r\n🌍 Website: www.englivision.net\r\n\r\n📧 Email: englivision2024@gmail.com\r\n (أو البريد اللي حاباه لو مختلف)\r\n\r\n▶️ YouTube: Engli-Vision2023\r\n\r\n💬 Telegram: @englivision1\r\n\r\n🖥️ Zoom\/ID: ywgusXZh","category":"pages","type":"textarea","created_at":"2025-06-02 18:52:31","updated_at":"2025-08-26 15:19:53"},
{"id":"11","key":"terms_and_conditions","value":"أهلا بكم في دورات Engli-Vision التعليمية\r\n\r\nقبل بداية رحلة النجاح والتعلم\r\nنود توضيح الشروط والضوابط للكورس لضمان جودة التعلم\r\n\r\nالالتزام بحضور المحاضرات هو أساس التعلم مع الحرص على كتابة نقاط تلخيص مع المدرس.\r\n\r\nالقيام بالواجبات المطلوبة على جروبات الواتساب والتدريبات المطلوبة لمهارات اللغة الأربعة.\r\n\r\nاحترام مواعيد التواصل مع المدرس والمنسقين: من 8 صباحاً حتى 10 مساءً.\r\n\r\nفي الحالات الطارئة يُرجى التواصل مع المنسق حال عدم حضور المحاضرة ليتم تعويضها بعد ذلك.\r\n\r\nلن يتم تسجيل المحاضرات بقرار من إدارة Engli-Vision ولا يحق للطالب طلب التسجيل.\r\n\r\nيسمح بتأجيل الكورس قبل بدايته فقط، ولا يسمح بذلك خلال الأسبوع الأول من الكورس، وذلك بعد تقديم سبب قوي ورسمي مع مستند رسمي، ثم يتم إرسالها لمنسق الكورس.\r\n\r\nفي حال رغبة الطالب في الانسحاب بعد دفع الرسوم يتم خصم قيمة أسبوع من المبلغ.\r\n\r\nيسمح بتغيير المستوى أو الكورس مرة واحدة فقط عند زيادة عدد الطلاب.\r\n\r\nلا يسمح بالانسحاب بعد الأسبوع الأول من بداية الكورس.\r\n\r\nيتم إضافة الطلاب إلى جروب الواتساب في يوم الدفع أو نهاية يوم الدفع.","category":"pages","type":"textarea","created_at":"2025-06-02 18:52:31","updated_at":"2025-08-26 14:56:58"},
{"id":"12","key":"about_ar","value":"إنجلي-فيجن، التي تأسست عام 2017، تقدم التعليم المهني والأنشطة التطويرية والتدريب لأعضائها وكذلك للمجتمع التجاري بشكل أوسع.\r\n\r\nتقدّم EV تدريبًا تجاريًا لطلاب الجامعات والخريجين الجدد من خلال دورات عبر الإنترنت أو حضور وجهاً لوجه. كما تفخر إنجلي-فيجن (EV) بإدارة دورات أونلاين أصبحت مصدرًا لا غنى عنه لكل من أصحاب العمل والباحثين عن عمل.","category":"pages","type":"textarea","created_at":"2025-06-02 18:52:31","updated_at":"2025-08-26 14:56:58"},
{"id":"13","key":"help_center_ar","value":"المساعدة الالكترونيه لوريم ايبسوم","category":"pages","type":"textarea","created_at":"2025-06-02 18:52:31","updated_at":"2025-06-02 18:52:31"},
{"id":"14","key":"terms_and_conditions_ar","value":"we would like to clarify the rules and regulations of the course to ensure the quality of learning.\r\n\r\nAttending lectures is the foundation of learning, with a focus on taking summary notes with the teacher.\r\n\r\nCompleting the required assignments on WhatsApp groups and the exercises for the four language skills.\r\n\r\nRespecting communication hours with the teacher and coordinators: from 8:00 AM to 10:00 PM.\r\n\r\nIn urgent cases, please contact the coordinator if you miss a lecture so it can be rescheduled.\r\n\r\nLectures will not be recorded as per the decision of Engli-Vision management, and students are not entitled to request recordings.\r\n\r\nPostponement of the course is allowed only before it starts. It is not permitted during the first week of the course. A valid and official reason, supported by a document, must be submitted to the course coordinator.\r\n\r\nIf a student wishes to withdraw after paying the fees, the amount of one week will be deducted.\r\n\r\nStudents are allowed to change their level or course only once and only if the number of students increases.\r\n\r\nWithdrawal is not permitted after the first week of the course.\r\n\r\nStudents will be added to the WhatsApp group on the day of payment or by the end of the payment day.","category":"pages","type":"textarea","created_at":"2025-06-02 18:52:31","updated_at":"2025-08-26 15:00:33"},
{"id":"15","key":"telegram","value":"https:\/\/web.telegram.org\/","category":"social links","type":"string","created_at":"2025-06-03 01:10:40","updated_at":"2025-06-03 01:10:40"},
{"id":"18","key":"youtube","value":"https:\/\/www.youtube.com\/","category":"social links","type":"string","created_at":"2025-06-03 01:10:40","updated_at":"2025-06-03 01:10:40"},
{"id":"19","key":"instagram","value":"https:\/\/www.instagram.com\/","category":"social links","type":"string","created_at":"2025-06-03 01:10:40","updated_at":"2025-06-03 01:10:40"},
{"id":"20","key":"listening","value":"5","category":"exam","type":"number","created_at":"2025-07-10 17:06:37","updated_at":"2025-09-13 16:59:43"},
{"id":"21","key":"reading","value":"5","category":"exam","type":"number","created_at":"2025-07-10 17:06:37","updated_at":"2025-09-13 16:59:43"},
{"id":"22","key":"case","value":"5","category":"exam","type":"number","created_at":"2025-07-10 17:06:37","updated_at":"2025-09-13 16:59:43"},
{"id":"23","key":"time_of_exam","value":"60","category":"exam","type":"number","created_at":"2025-07-10 17:10:21","updated_at":"2025-08-24 01:12:44"},
{"id":"24","key":"refund_policy","value":"Refund Policy:\r\nRefund requests are allowed only in case of an increase in the number of students.\r\nRefunds will be processed within 7 business days from the request date.\r\n.\r\n\r\nPlease refrain from sharing full clips from the internet during the daily language skills activities.\r\n\r\nA student will be excluded from the course without a refund in the following cases:\r\n\r\nFailure to adhere to general ethics when dealing with the teacher or coordinators.\r\n\r\nSharing the Zoom link with friends or acquaintances outside the course.\r\n\r\nUsing inappropriate language with the teacher or coordinators.\r\n\r\nLeaking the course materials or recording the lectures for a full week.\r\n\r\nBeing absent for 3 consecutive lectures without prior permission.\r\n\r\nCommitting any legally or religiously prohibited actions, such as insulting religion.\r\n\r\nRepeated failure to submit required assignments within 24 hours after being sent by the teacher.","category":"pages","type":"textarea","created_at":"2025-06-02 18:52:31","updated_at":"2025-08-26 14:56:58"},
{"id":"25","key":"refund_policy_ar","value":"سياسة الاسترداد: الاسترداد يكون خلال 7 أيام عمل.\r\n\r\nالرجاء عدم مشاركة مقاطع كاملة من الإنترنت أثناء الأنشطة اليومية لمهارات اللغة.\r\n\r\nوسيتم استبعاد الطالب من الكورس دون استرداد رسوم الكورس في الحالات الآتية:\r\n\r\nعدم الالتزام بالأخلاقيات العامة في التعامل مع المدرس والمنسقين.\r\n\r\nمشاركة رابط الزوم مع أصدقاء ومعارف من خارج الكورس.\r\n\r\nاستخدام لغة غير لائقة مع المدرس أو المنسق.\r\n\r\nتسريب المادة العلمية الخاصة بالكورس أو تسجيل المحاضرات لمدة أسبوع كامل.\r\n\r\nالغياب 3 محاضرات متتالية دون إذن مسبق.\r\n\r\nمخالفة أي قوانين وحرام شرعاً مثل سب الدين أو غيره.\r\n\r\nعدم تسليم الواجبات المطلوبة بشكل متكرر خلال 24 ساعة بعد إرسالها من قبل المدرس.","category":"pages","type":"textarea","created_at":"2025-06-02 18:52:31","updated_at":"2025-08-26 14:56:58"},
{"id":"26","key":"privacy_policy","value":"Privacy Policy\r\n\r\nEngli-Vision (\"we,\" \"us,\" or \"our\") is committed to protecting the privacy of our students, faculty, staff, and website visitors. This Privacy Policy outlines how we collect, use, disclose, and protect your personal information when you interact with our website, services, and educational activities.\r\n\r\n1. Information We Collect\r\nWe may collect and process the following types of personal information:\r\n\r\nPersonal Identification Information: Name, date of birth, gender, nationality, and identification documents.\r\n\r\nContact Information: Email address, phone number, mailing address.\r\n\r\nAcademic Records: Transcripts, enrollment status, grades, and disciplinary records.\r\n\r\nFinancial Information: Payment details, tuition fees, and scholarship information.\r\n\r\nTechnical Information: IP address, browser type, device information, and website usage data.\r\n\r\n2. How We Use Your Information\r\nThe information we collect may be used for the following purposes:\r\n\r\nTo process student applications, admissions, and course enrollments.\r\n\r\nTo manage academic records, financial transactions, and administrative services.\r\n\r\nTo send important updates, notifications, and promotional communications.\r\n\r\nTo enhance website functionality, security, and user experience.\r\n\r\nTo comply with legal, regulatory, and institutional requirements.\r\n\r\n3. How We Share Your Information\r\nEnglivision does not sell or rent your personal data. However, your information may be shared in the following cases:\r\n\r\nWith Internal Departments: To support academic and administrative processes.\r\n\r\nWith Trusted Service Providers: For services like payment processing, IT support, and communications.\r\n\r\nWith Legal or Government Authorities: Where required by law or to meet regulatory obligations.\r\n\r\nWith Academic Partners: For collaborative programs, research, and student exchanges.\r\n\r\n4. Data Security\r\nEnglivision takes appropriate technical and organizational measures to protect your personal data from unauthorized access, misuse, or loss. While we strive to secure your data, no method of transmission over the internet is completely secure. We encourage you to take reasonable precautions when sharing information online.\r\n\r\n5. Retention of Personal Data\r\nWe retain personal information only for as long as necessary to fulfill the purposes stated in this policy, including academic, legal, and administrative obligations. Data retention periods may vary based on the type of information and applicable regulations.","category":"pages","type":"textarea","created_at":"2025-06-02 18:52:31","updated_at":"2025-07-22 00:48:36"},
{"id":"27","key":"privacy_policy_ar","value":"سياسة الخصوصية\r\n\r\nتلتزم Englivision (\"نحن\" أو \"لنا\" أو \"خاصتنا\") بحماية خصوصية طلابنا وأعضاء هيئة التدريس والموظفين وزوّار الموقع الإلكتروني. توضح هذه السياسة كيفية جمع واستخدام والكشف عن وحماية معلوماتك الشخصية عند تفاعلك مع موقعنا الإلكتروني وخدماتنا وأنشطتنا التعليمية.\r\n\r\n1. المعلومات التي نجمعها\r\nقد نقوم بجمع ومعالجة الأنواع التالية من المعلومات الشخصية:\r\n\r\nمعلومات التعريف الشخصية: الاسم، تاريخ الميلاد، الجنس، الجنسية، ومستندات الهوية.\r\n\r\nمعلومات الاتصال: عنوان البريد الإلكتروني، رقم الهاتف، والعنوان البريدي.\r\n\r\nالسجلات الأكاديمية: كشوف الدرجات، حالة القيد، الدرجات، والسجلات التأديبية.\r\n\r\nالمعلومات المالية: تفاصيل الدفع، الرسوم الدراسية، ومعلومات المنح الدراسية.\r\n\r\nالمعلومات التقنية: عنوان IP، نوع المتصفح، معلومات الجهاز، وبيانات استخدام الموقع.\r\n\r\n2. كيفية استخدام معلوماتك\r\nقد نستخدم المعلومات التي نجمعها للأغراض التالية:\r\n\r\nمعالجة طلبات التقديم، القبول، والتسجيل في الدورات الدراسية.\r\n\r\nإدارة السجلات الأكاديمية، المعاملات المالية، والخدمات الإدارية.\r\n\r\nإرسال التحديثات الهامة، الإشعارات، والمواد الترويجية.\r\n\r\nتحسين أداء وأمان الموقع وتجربة المستخدم.\r\n\r\nالامتثال للمتطلبات القانونية والتنظيمية والمؤسسية.\r\n\r\n3. كيفية مشاركة معلوماتك\r\nلا تقوم Englivision ببيع أو تأجير بياناتك الشخصية. ومع ذلك، قد نشارك معلوماتك في الحالات التالية:\r\n\r\nمع الأقسام الداخلية: لدعم العمليات الأكاديمية والإدارية.\r\n\r\nمع مزودي الخدمة الموثوقين: مثل خدمات معالجة المدفوعات، الدعم الفني، وخدمات الاتصال.\r\n\r\nمع الجهات القانونية أو الحكومية: عند الضرورة للامتثال للقوانين أو اللوائح.\r\n\r\nمع الشركاء الأكاديميين: لأغراض التعاون الأكاديمي، والبرامج المشتركة، وتبادل الطلاب.\r\n\r\n4. أمان البيانات\r\nتتخذ Englivision تدابير تقنية وتنظيمية مناسبة لحماية بياناتك الشخصية من الوصول غير المصرح به أو سوء الاستخدام أو الفقد. وعلى الرغم من جهودنا، لا توجد وسيلة نقل بيانات عبر الإنترنت آمنة بنسبة 100%، لذا نوصي باتخاذ الحيطة والحذر عند مشاركة معلوماتك عبر الإنترنت.\r\n\r\n5. الاحتفاظ بالمعلومات الشخصية\r\nنحتفظ بالمعلومات الشخصية فقط للمدة اللازمة لتحقيق الأغراض المذكورة في هذه السياسة، بما في ذلك المتطلبات الأكاديمية والقانونية والإدارية. وقد تختلف فترات الاحتفاظ حسب نوع المعلومات واللوائح المعمول بها.","category":"pages","type":"textarea","created_at":"2025-06-02 18:52:31","updated_at":"2025-07-22 00:48:36"},
{"id":"28","key":"primary_color","value":"#0C3A6D","category":"theme","type":"color","created_at":"2025-07-20 19:44:44","updated_at":"2025-07-20 19:44:44"},
{"id":"29","key":"secondary_color","value":"#D65E3D","category":"theme","type":"color","created_at":"2025-07-20 19:44:44","updated_at":"2025-07-20 19:44:44"},
{"id":"30","key":"third_color","value":"#F7F8FD","category":"theme","type":"color","created_at":"2025-07-20 19:44:44","updated_at":"2025-07-20 19:44:44"},
{"id":"31","key":"logo_student","value":"settings\/8650520250714175231logo2.webp","category":"logos","type":"image","created_at":"2025-06-02 18:52:31","updated_at":"2025-07-14 20:52:31"},
{"id":"32","key":"logo_instructor","value":"settings\/8650520250714175231logo2.webp","category":"logos","type":"image","created_at":"2025-06-02 18:52:31","updated_at":"2025-07-14 20:52:31"},
{"id":"33","key":"message","value":"Engli-Vision Training Center envisions itself to be the \r\nleading training  center by providing individuals and \r\ncompanies with the desired education materials to \r\nachieve their goals whether in working life or self-devel\r\nopment which will be a part of the country pride and \r\ngrowth through its contribution to economic development and nation building.","category":"message","type":"textarea","created_at":"2025-06-02 18:52:31","updated_at":"2025-08-25 18:50:31"}
]
}
]



*/