import { Alert, Box, Container, Pagination } from "@mui/material";
import Search from "./search";
import Content from "./content";
import { useEffect, useState } from "react";
import Loading from "@/widgets/loading";
import FetchAlert from "@/shared/alert";

function IndexContent() {
  const [elements, setElements] = useState(null);
  const [searchStatus, setSearchStatus] = useState(true);
  const [searchContent, setSearchContent] = useState("");
  const [alertStatus, setAlertStatus] = useState({ open: false, message: "" });
  const [pageCount, setPageCount] = useState(0);
  const [currPage, setCurrPage] = useState(1);

  function getData(page = 1) {
    setElements(null);
    setSearchStatus(true);
    setPageCount(0);

    fetch(import.meta.env.VITE_BACKEND_SERVER + "/api/getArticle?page=" + page + "&search=" + searchContent)
      .then(response => response.json()).then(data => {
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
        setSearchStatus(false);
      }).catch(e => {
        console.error(e);
        setAlertStatus({ message: "Неизвестная ошибка!", open: true });
      });

    fetch(import.meta.env.VITE_BACKEND_SERVER + "/api/getArticlePageCount?search=" + searchContent)
      .then(response => response.json()).then(data => {
        setPageCount(data.pageCount);
      }).catch(e => {
        console.error(e);
        setAlertStatus({ message: "Неизвестная ошибка!", open: true });
      });
  }

  useEffect(() => {
    let debouncer = setTimeout(() => {
      getData(currPage, searchContent);
    }, 1000);
    return () => {
      clearTimeout(debouncer);
    }
  }, [searchContent]);

  const handleChange = (event, value) => {
    setCurrPage(value);
    getData(value, searchContent);
  };

  function searchElements(text) {
    setSearchContent(text);
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
        {elements === null || elements === false ? (
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

      <Box sx={{ margin: "48px 20px 0px", display: pageCount === 0 ? "none" : "flex", justifyContent: "center" }}>
        <Pagination count={pageCount} shape="rounded" onChange={handleChange} />
      </Box>

      <FetchAlert message={alertStatus.message} isOpen={alertStatus.open} setOpen={setAlertStatus} />
    </Box >
  );
}

export default IndexContent;
