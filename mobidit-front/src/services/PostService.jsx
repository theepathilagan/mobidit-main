export async function createPost (params) {    
    var formBody = [];

    for (var property in params) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(params[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    
    const response = await fetch('http://localhost:3008/api/posts/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    })

    const result = await response.json()
    return result
}

export async function getAllPosts (username) {
  const response = await fetch(`http://localhost:3008/api/posts/feed/${username}`)
  const jsonData = await response.json()
  return jsonData
}

export async function getUserPosts (username) {
  const response = await fetch(`http://localhost:3008/api/users/${username}`)
  const jsonData = await response.json()
  return jsonData
}

export async function getPostById (id) {
  const response = await fetch(`http://localhost:3008/api/posts/${id}`)
  const jsonData = await response.json()
  return jsonData
}