<template>
  <Header></Header>

  <Body>
    <NuxtPage></NuxtPage>
  </Body>
  <Footer></Footer>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Road+Rage&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,100;1,300;1,400;1,500;1,700&display=swap');

* {
  box-sizing: border-box;
}

html,
body,
#__nuxt {
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
  background: #1b1b1b;
  color: #fff;
  font-family: 'Roboto', sans-serif;
}

#__nuxt {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
}

button {
  background: #505050;
  color: white;
  border: 0;
  border-radius: 3px;
  padding: 10px 15px;
  box-shadow: 3px 3px 2px 0px #00000070;
}

button:hover {
  background: #696969;
  box-shadow: 3px 3px 2px 0px #00000070 inset;
}

button:disabled {
  background: #aaaaaa;
  color: black;
  box-shadow: 3px 3px 2px 0px #00000070 inset;
}

a {
  color: rgb(86, 154, 232);
  text-decoration: none;
}

h1 {
  padding: 5px;
  margin: 0px;
}

.btn-primary {
  background: #118311;
  color: white;
  font-family: "Roboto";
  padding: 10px 30px
}

.btn-primary:hover {
  background: #099909;
}

.btn-danger {
  background: #912727;
}

.btn-danger:hover {
  background: #611a1a;
}

.btn-danger:hover:disabled {
  background: #aaaaaa;
}
</style>
