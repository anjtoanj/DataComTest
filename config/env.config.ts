export const ENV = {
  QA: "https://assertqa.com/",
  //   STAGING: 'https://staging.assertqa.com/',
  //   PROD: 'https://assertqa.com/',
  //   APP2_QA: 'https://qa.app2.com/',
};

// Pick base URL dynamically from environment variable, default to QA
export const BASE_URL = process.env.BASE_URL || ENV.QA;
