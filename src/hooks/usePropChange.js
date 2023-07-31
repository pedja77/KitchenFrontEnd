export const usePropChange = (prop, dispatch, action) => {
    return useEffect(() => {
      let ignore = false;
      const getData = async () => {
        const response = await fetch(
          `http://localhost:8080/api/v1/students/grade/${prop}`,
          {
            method: "GET",
            headers: {
              Authorization: getToken(),
            },
          }
        );
        checkResponse(response);
        if (!ignore) {
          const data = await response.json();
          dispatch({
            type: action,
            data: data,
            // isFirst: firstRender
          });
        }
      };
      
      getData();
        
      return () => (ignore = true);
    }, [prop]);
  };