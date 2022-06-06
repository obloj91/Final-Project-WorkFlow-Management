import React, { useState, useContext } from "react";
import backgroundImage from "../assets/background2.png";
import styled from "styled-components";
import { DataContext } from "./DataContext";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const UserHomepage = () => {
  let navigate = useNavigate();
  // 1 ---------------------------- Find AssignedTask------------------------------------------
  const { currentLoggedUser, allTasks } = useContext(DataContext);

  const findAssignedTasks =
    allTasks !== null
      ? allTasks.filter((task) =>
          task.assignedUsers.find(
            (el) =>
              currentLoggedUser !== null &&
              currentLoggedUser.firstName === el.firstName &&
              currentLoggedUser.lastName === el.lastName
          )
        )
      : ""; //if we click reload page and allTasks status goes to null we do not trigger the .filter function as it wil lreturn an error

  console.log("findAssignedTasks", findAssignedTasks);

  // 2 - ---------------------- Uploading Files------------------------------------------------
  // 2.1 Load files into useState
  const [uploadData, setUploadData] = useState();

  const filesUploadHandler = (e) => {
    setUploadData(e.target.files[0]);
  };

  const onSumbitHandler = (e) => {
    e.preventDefault();
    // handle file data before sending it in the format that multer can read
    const data = new FormData();
    data.append("files", uploadData);

    fetch("/uploads", {
      method: "POST",
      body: data,
    })
      .then((res) => {
        window.alert("Upload completed");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const updateTaskStat = () => {
    const settings = {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch("/tasks", settings)
      .then((res) => res.json())
      .then((response) => {
        const { status, message } = response; //deconstructing response's status to know if succefull or not
        window.alert(message);
      })
      .catch((error) => console.log("ERROR: ", error));
  };

  //-------------------------- Task Selection------------------------------------------------------------//

  const [selectTask, setSelectTask] = useState({ taskId: "" });
  const handleChange = (ev) => {
    setSelectTask({ taskID: ev.target.value });
  };

  // Drop Down Progress Menu

  const options = [
    { value: "status", label: "Work in progress" },
    { value: "status", label: "Submitted for review" },
    { value: "status", label: "Started" },
  ];
  const [formData, setFormData] = useState({}); //Object state for storing form data from inputs

  return (
    <>
      <Background />
      {allTasks !== null && currentLoggedUser !== null ? (
        <>
          <Title>
            Welcome{" "}
            {currentLoggedUser.firstName + " " + currentLoggedUser.lastName}
          </Title>

          <HomeWrapper>
            <ListWrapper>
              {findAssignedTasks.map((el) => {
                return (
                  <TaskWrapper key={el.taskID}>
                    <h3 style={{ color: "#F16436" }}>
                      Project Name:{" "}
                      <span style={{ color: "yellow" }}>{el.projectName}</span>
                    </h3>

                    <div style={{ marginLeft: "10px" }}>
                      <div style={{ display: "flex", marginBottom: "4px" }}>
                        <h4 style={{ color: "#F16436" }}>
                          Assigned Task:{" "}
                          <span style={{ color: "white" }}>{el.taskName}</span>
                        </h4>
                        <label
                          style={{
                            display: "flex",
                            alignItems: "center",
                            position: "relative",
                            top: "10%",
                          }}
                        >
                          <input
                            type="radio"
                            onChange={handleChange}
                            value={`${el.taskID}`}
                            checked={selectTask.taskID === `${el.taskID}`}
                            style={{ marginLeft: "25vw" }}
                          />
                          <span
                            style={{
                              color: "white",
                              fontSize: "11px",
                              overflowWrap: "break-word",
                            }}
                          >
                            Select
                          </span>
                        </label>
                      </div>
                      <div>Task Details: {el.details}</div>
                      <div>Due Date: {el.dueDate}</div>
                      <div>Comments: {el.comments}</div>
                      <div>Details: {el.details}</div>
                      <div>Number of Deliverables: {el.nbrDeliverables}</div>
                      <div></div>

                      <div style={{ marginTop: "5%", marginBottom: "1%" }}>
                        Status:{""}{" "}
                      </div>
                      <Select
                        options={options}
                        placeholder={el.status}
                        onChange={(ev) => {
                          setFormData({
                            status: ev.label,
                            dueDate: el.dueDate,
                            taskID: el.taskID,
                            nbrDeliverables: el.nbrDeliverables,
                            details: el.details,
                            comments: el.comments,
                            assignedUsers: el.assignedUsers,
                          });
                        }}
                      />
                    </div>
                    <div>
                      <Button onClick={updateTaskStat}>
                        Update Task Status
                      </Button>
                    </div>
                  </TaskWrapper>
                );
              })}
            </ListWrapper>
          </HomeWrapper>
          <Wrapper>
            <FormWrapper onSubmit={onSumbitHandler}>
              <input
                type={"file"}
                onChange={filesUploadHandler}
                style={{ marginLeft: "2%" }}
              />
              <SubmitButton type="submit">Upload File</SubmitButton>
            </FormWrapper>
          </Wrapper>
        </>
      ) : (
        //if page refreshes we use this message to indicate user is logged out
        <div
          style={{
            width: "600px",
            position: "absolute",
            top: "50%",
            left: "30%",
          }}
        >
          <Title
            style={{
              textAlign: "center",
              borderRadius: "10px",
              padding: "10px",
              background: "red",
              marginRight: "15px",
            }}
          >
            User signed out, go back to login page!
            <button
              style={{
                border: "none",
                padding: "7px",
                borderRadius: "10px",
                background: "#28B0FF",
                color: "white",
              }}
              onClick={() => navigate("/userLogin")}
            >
              <b>Go to Login</b>
            </button>
          </Title>
        </div>
      )}
    </>
  );
};

{
  /* <a
href="http://localhost:4000/Uploads/1652833066781%20IMG_2527.jpeg"
download="Download1"
>
Download
</a>
<img src="http://localhost:4000/Uploads/1652833066781%20IMG_2527.jpeg" /> */
}

const Title = styled.h1`
  margin-top: 2%;
  margin-left: 3%;
  color: white;
  font-size: 25px;
`;

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 900px;
  margin: 50px;
  background: rgba(221, 237, 236, 1);
  border-radius: 5px;
`;

const ListWrapper = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  font-weight: bold;
  padding: 20px 0px 20px 20px;
  width: 17rem;
`;

const TaskWrapper = styled.div`
  width: 40vw;
  margin-left: 3%;
  margin-bottom: 20px;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  background: #42c99d;
  /* align-items:baseline; */
  font-weight: normal;
  h3 {
    border-bottom: 1px solid;
    margin-bottom: 5px;
  }
  p {
    color: white;
  }

  .tooltip {
    position: relative;
    display: inline-block;
  }

  .tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: #5b9bd5;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;

    /* Position the tooltip */
    position: absolute;
    z-index: 1;
    top: -5px;
    left: 105%;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
  }
`;

const Button = styled.button`
  border-radius: 5px;
  font-size: 15px;
  border: none;
  background: #f16436;
  padding: 10px;
  width: 150px;
  margin-top: 15px;
  color: white;
  &:hover {
    color: white;
    background-color: rgb(40, 176, 255);
    transition: 150ms;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const FormWrapper = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  align-items: baseline;
  background: #ddedec;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
`;
const Background = styled.div`
  background-image: url(${backgroundImage});
  position: absolute;
  min-width: 100%;
  min-height: 300%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: -1;
`;

const SubmitButton = styled.button`
  color: white;
  font-weight: bold;
  padding: 12px 35px 12px 35px;
  margin-bottom: 0.2%;
  margin-top: 0.2%;
  margin-right: 1%;
  text-align: center;
  border: none;
  border-radius: 10px;
  background: blue;
  cursor: pointer;
`;

export default UserHomepage;
