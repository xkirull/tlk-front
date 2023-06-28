import { Alert, Box, Container, Pagination } from "@mui/material";
import Search from "./search";
import Content from "./content";
import { useEffect, useState } from "react";
import Loading from "@/widgets/loading";
import FetchAlert from "@/shared/alert";

function IndexContent() {
  const [elements, setElements] = useState([]);
  const [allElementData, setAllElementData] = useState([]);
  const [searchStatus, setSearchStatus] = useState(true);
  const [alertStatus, setAlertStatus] = useState({ open: false, message: "" });
  const [pageCount, setPageCount] = useState(0);

  function getData(page = 1) {
    setElements([]);
    setAllElementData([]);
    setSearchStatus(true);

    fetch(import.meta.env.VITE_BACKEND_SERVER + "/api/getArticle?page=" + page)
      .then(response => response.json()).then(data => {
        console.log(data);
        const responseData = data.map(el => {
          return {
            "image": el.author_image || "",
            "title": el.title,
            "caption": el.name + " " + el.date,
            "content": {
              "image": el.image || "",
              "text": el.text,
            }
          }
        });

        setElements(responseData);
        setAllElementData(responseData);
        setSearchStatus(false);
      }).catch(e => {
        console.error(e);
        setAlertStatus({ message: "Неизвестная ошибка!", open: true });
      });
  }

  useEffect(() => {
    getData();

    fetch(import.meta.env.VITE_BACKEND_SERVER + "/api/getArticlePageCount")
      .then(response => response.json()).then(data => {
        setPageCount(data.pageCount);
      }).catch(e => {
        console.error(e);
        setAlertStatus({ message: "Неизвестная ошибка!", open: true });
      });
  }, []);

  const handleChange = (event, value) => {
    getData(value);
  };

  function searchElements(text) {
    function checkElement(element) {
      if (new RegExp(text, "i").test(element.title)) return true;
      if (new RegExp(text, "i").test(element.caption)) return true;

      for (let content of element.content.text) {
        if (new RegExp(text, "i").test(content)) return true;
      }

      return false;
    }

    setElements(allElementData.filter(checkElement));
  }

  return (
    <Box className="content">
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Search disabled={searchStatus} callback={searchElements} />
      </Container>
      <Container>
        {allElementData.length === 0 || elements === false ? (
          <Loading
            message="Не удалось загрузить данные!"
            status={elements === false ? "error" : "load"}
          />
        ) : elements.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              margin: "40px 0",
            }}
          >
            <Alert severity="info">По вашему запросу статьи не найдены!</Alert>
          </Box>
        ) : (
          <Content arrayOfElements={elements} />
        )}
      </Container>

      <Box sx={{ margin: "48px 20px 0px", display: "flex", justifyContent: "center" }}>
        <Pagination count={pageCount} shape="rounded" onChange={handleChange} />
      </Box>

      <FetchAlert message={alertStatus.message} isOpen={alertStatus.open} setOpen={setAlertStatus} />
    </Box>
  );
}

export default IndexContent;
