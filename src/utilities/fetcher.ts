type Method = "GET" | "POST" | "PUT" | "DELETE";

export const queryFetch = async (
  method: Method,
  url: string,
  cache?: RequestCache
) => {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      cache: cache ? cache : "default",
    });
    return await response.json();
  } catch (e) {
    console.log(e);
  }
};

export const mutateFetch = async (
  method: Method,
  url: string,
  body?: { [key: string]: any }
) => {
  try {
    if (!body) {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    }
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  } catch (e) {
    console.log(e);
  }
};
