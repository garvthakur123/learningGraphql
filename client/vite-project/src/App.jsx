import './App.css'
import { gql } from "@apollo/client"
import { useQuery, useMutation } from "@apollo/client/react"
import { useState } from 'react'

const GET_USERS = gql`
  query Getusers {
    getUsers {
      id
      age
      name
      isMarried
    }
  }
`

const GET_USERS_BY_ID = gql`
  query GetuserById($id: ID!) {
    getUserById(id: $id) {
      id
      age
      name
      isMarried
    }
  }
`

const CREATE_USER = gql`
  mutation CreateUser( $name: String!, $age: Int!, $isMarried: Boolean!){
    createUser(name: $name, age: $age, isMarried: $isMarried) {
      name
    }
  }
`



function App() {
  const [userDeatils, setUserDetails] = useState({});
  const { data: getUsersData, error: getUsersError, loading: getUsersLoading } = useQuery(GET_USERS)
  const { data, error, loading } = useQuery(GET_USERS_BY_ID, {
    variables: {id: "2"}
  })


  const [createUser] = useMutation(CREATE_USER)

  if (getUsersLoading) return <p>Loading...</p>
  if (getUsersError) return <p>Error Occured: {getUsersError.message}</p>
  

  const handleCreateUser = async() => {
    createUser({variables: {name: userDeatils.name, age: Number(userDeatils.age), isMarried: false}});
  }

  return (
    <>
      <div>
        <input placeholder='Name' onChange={(e) => setUserDetails((prev) => ({...prev, name: e.target.value}))}></input>
        <input placeholder='Age' type='Number' onChange={(e) => setUserDetails((prev) => ({...prev, age: e.target.value}))}></input>
        <button onClick={handleCreateUser}>Create User</button>
      </div>
      <div>
        {loading ? (<p>Loading the specific user</p>) : (
          <>
          <h1>Specific User Details</h1>
          <p>{data.getUserById.name}</p>
          <p>{data.getUserById.age}</p>
          </>
          
        )}
      </div>

      <h1>All Users</h1>
      {getUsersData.getUsers.map((user) => (
        <div key={user.id}>
          <p>Name: {user.name}</p>
          <p>Age: {user.age}</p>
          <p>Is the user married : {user.isMarried ? "No" : "Yes"}</p>
        </div>
      ))}
    </>
  )
}

export default App