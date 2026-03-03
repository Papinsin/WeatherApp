
export  function backgroundUpdate(city ="london"){
    const container = document.querySelector(".container")
    let randomNumber = Math.floor(Math.random()*5)
    if (randomNumber == 0){
        randomNumber = 1
    } 
    console.log(randomNumber)
    console.log("started")
    const userID = 886600
    const accessKey = 'MWCx3FKIePD3H0o2SOkntyAg5oQXd88feIM7qSra54k'
    const userUrlPath = 'https://api.unsplash.com/photos/?client_id=MWCx3FKIePD3H0o2SOkntyAg5oQXd88feIM7qSra54k'
    let  jsut = 'https://api.unsplash.com/search/photos?query=praga&per_page=1&client_id=MWCx3FKIePD3H0o2SOkntyAg5oQXd88feIM7qSra54k'
    fetch(`https://api.unsplash.com/search/photos?query=${city}&per_page=${randomNumber}&client_id=${accessKey}`)
    .then((data)=>{
        console.log(data)
        data.json()
    .then((dataJson)=>{
        console.log(dataJson.results)
        container.style.backgroundImage = `url(${dataJson.results[randomNumber -1].urls.full})`
    }
    )
    })
}