export const backend_url = "http://localhost:5000";

export const weight = [
  100,
  200,
  300,
  400,
  500,
  600,
  700,
  800,
  900,
  "bolder",
  "bolder",
  "lighter",
  "normal",
  "unset",
];

/**
 * Session object to manage session of user
 */
export const Session = {
  set(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  get(key) {
    return sessionStorage.getItem(key)
      ? JSON.parse(sessionStorage.getItem(key))
      : null;
  },
  delete(key) {
    sessionStorage.removeItem(key);
  },
  clear() {
    sessionStorage.clear();
  },
};

/**
 *
 * @param {*} url [url from image ]
 * @param {*} ext [image extension]
 */
export const download = (url, ext = "") => {
  const link = document.createElement("a");
  link.download = Date.now().toString() + ext;
  link.href = url;
  link.click();
};
