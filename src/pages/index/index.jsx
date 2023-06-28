import Footer from "@/widgets/footer";
import Header from "@/widgets/header";
import IndexContent from "./sections";
import { getCookie, setCookie } from "@/shared/cookie";
import { useEffect } from "react";

function IndexPage() {
  const email = getCookie("email");
  const password = getCookie("password");

  if (!Boolean(email) || !Boolean(password)) {
    window.location.href = "/login";
  }

  useEffect(() => {

    fetch(import.meta.env.VITE_BACKEND_SERVER + "/api/authorization", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({ email: email, password: password }).toString()
    }).then(response => response.json()).then(resData => {
      if (resData.hasOwnProperty("error") && resData.error == 1) {
        setCookie("email", "", 0);
        setCookie("password", "", 0);

        window.location.href = "/login";

        return;
      }
    }).catch(e => {
      console.error(e);
    });

  }, []);

  return (
    <>
      <Header />

      <IndexContent />

      <Footer />
    </>
  );
}

export default IndexPage;
