'use client'

export default function APITest() {

  const fetchData = async () => {
    try {

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        body: JSON.stringify({
          email: "khanghou99@gmail.com",
          password: "password"
        })
      })
      console.log(res)
    } catch (ex) {
      console.error(ex)
    }
  }

  return (
    
    <button onClick={fetchData}>
    Click me
  </button>
  )
}
