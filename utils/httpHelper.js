export async function GetAuthentication({ email, password }) {
  const reqBody = {
    email: email,
    password: password,
  };
  try {
    const response = await fetch(
      "https://jq57skw46i.execute-api.us-east-1.amazonaws.com/dev/login",
      {
        method: "POST",
        body: JSON.stringify(reqBody),
      }
    );
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const data = await response.json();
    console.log(data.token);
    console.log("awaiting");
    return data.token;
  } catch (error) {
    console.log(error);
  }
}

export async function RegisterNewuser({ email, password }) {
  const reqBody = {
    email: email,
    password: password,
  };

  const response = await fetch(
    "https://jq57skw46i.execute-api.us-east-1.amazonaws.com/dev/register",
    {
      method: "POST",
      body: JSON.stringify(reqBody),
    }
  );
  const data = await response.json();
  return data;
}
export async function GetUserInformation({ token }) {
  const response = await fetch(
    "https://jq57skw46i.execute-api.us-east-1.amazonaws.com/dev/me",
    {
      method: "GET",
      headers: {
        Authorization: token,
      },
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
}

