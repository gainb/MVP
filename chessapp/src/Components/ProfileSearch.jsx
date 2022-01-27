

function ProfileSearch(props) {


  return (
    props.searchedInfo ?
    <>
    <div>
      {props.searchedInfo.avatar ? <img src={props.searchedInfo.avatar} alt='user avatar' id='searchedAvatar'/> : <i>No avatar</i>}
      <p>Followers: {props.searchedInfo.followers}</p>
      <p>Last Seen: {props.searchedInfo.last_online.toLocaleString()}</p>
      <p>Joined: {props.searchedInfo.joined.toLocaleString()}</p>
      <p>Plan: {props.searchedInfo.status}</p>
    </div>
    </>
    : null
  )
}

export default ProfileSearch;