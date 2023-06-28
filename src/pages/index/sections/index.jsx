import { Alert, Box, Container } from "@mui/material";
import Search from "./search";
import Content from "./content";
import { useEffect, useState } from "react";
import Loading from "@/widgets/loading";

function IndexContent() {
  const [elements, setElements] = useState([]);
  const [allElementData, setAllElementData] = useState([]);
  const [searchStatus, setSearchStatus] = useState(true);

  const data = [
    {
      "image": "",
      "title": "Test title",
      "caption": "12.10.1995",
      "content": {
        "image": "",
        "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      }
    },
    {
      "image": "",
      "title": "Test title",
      "caption": "12.10.1995",
      "content": {
        "image": "",
        "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      }
    },
  ];

  useEffect(() => {
    setElements(data);
    setAllElementData(data);
    setSearchStatus(false);
  }, []);

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
    </Box>
  );
}

export default IndexContent;
