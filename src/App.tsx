import { useEffect, useState } from "react";
import axios, { CanceledError } from "axios";
import User from "./components/User";

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then((results) => {
        setUsers(results.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if(err instanceof CanceledError) return;
        setErrorMsg(err.message);
        setIsLoading(false);
      });

      return () => controller.abort();
  }, []);

  const deleteUser = (user: User) => { 
    const originalUsers = [...users];
    setUsers(users.filter((x) => x.id !== user.id));
    axios
      .delete("https://jsonplaceholder.typicode.com/users/" + user.id)
      .catch((err) => {
        setErrorMsg(err.message);
        setUsers(originalUsers);
      });
  };

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = {
      id: id,
      name: name,
      username: username,
      email: email,
    };
    //UI
    setUsers([newUser, ...users]);

    //API
    axios
      .post("https://jsonplaceholder.typicode.com/users", newUser)
      .then(({ data: savedUser }) => {
        setUsers([savedUser, ...users]);
        setEmail("");
        setId("");
        setName("");
        setUsername("");
      })
      .catch((err) => {
        setErrorMsg(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {

    const originalUsers = [...users];
    const updatedUser = {
      ...user,
      name: name,
      username: username,
      email: email
    }

    console.log(name);
    console.log(username);
    console.log(email);  

    setUsers(users.map(u => u.id === user.id ? updatedUser : u));

    axios.patch("https://jsonplaceholder.typicode.com/users/" + user.id)
    .then((result) => {
      console.log(result);
      console.log(users);
      
    })
    .catch(err => {
      setErrorMsg(err.message);
      setUsers(originalUsers);
    })
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h3>Add new user</h3>

            <div className="row">
              <div className="col-sm-6">
                <label className="form-label">ID</label>
                <input
                  value={id}
                  onChange={(e) => {
                    setId(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-sm-6">
                <label className="form-label">Name</label>
                <input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <label className="form-label">Email</label>
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  className="form-control"
                />
              </div>
              <div className="col-sm-6">
                <label className="form-label">Username</label>
                <input
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  type="email"
                  className="form-control"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <br />
                <button onClick={addUser} className="btn btn-success">
                  Add New User
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <h3>Get all users</h3>

            {errorMsg && <p className="text-danger">{errorMsg}</p>}

            {isLoading && <div className="spinner-border"></div>}

            <div className="accordion" id="accordionExample">
              {users.map((user) => (
                <User key={user.id} user={user} updateAction={updateUser} deleteAction={deleteUser} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
