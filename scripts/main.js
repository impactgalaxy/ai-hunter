const dataGetFromSever = async () => {
    const url = "https://openapi.programming-hero.com/api/ai/tools";
    const res = await fetch(url);
    const data = await res.json();
    const mainData = data.data.tools;
    displayData(mainData);
}
dataGetFromSever();
const displayData = (datum) => {
    const parent = document.getElementById("parent-div");
    datum.forEach(data => {

        const div = document.createElement("div");
        const ul = document.createElement("ul");
        const secondDiv = document.createElement("second-div");

        div.classList.add("card", "w-80", "bg-base-200", "shadow-xl", "p-5");
        ul.classList.add("list-decimal", "p-3")
        secondDiv.classList.add("border-t-2", "border-t-bg-base-300", "py-4", "relative")

        let features = data.features;
        const htmlElement = `
            <figure><img src="${data?.image || ""}" alt="Shoes" /></figure>
                    <div class="mt-4">
                        <h2 class="card-title">Features</h2>
                        
                    </div>`;
        features.forEach(value => {
            const li = document.createElement("li");
            li.innerText = value;
            ul.appendChild(li);
        })

        div.innerHTML += htmlElement;
        const secondElement = `
        <h1 class="text-xl text-white">${data.name}</h1>
        <p>${data.published_in}</p>
        <button class="text-2xl btn btn-circle align-middle absolute top-1/2 right-0 -translate-y-1/2" onclick="showPopUp('${data.id}')">&#8594;</button>
        `;
        secondDiv.innerHTML += secondElement



        div.append(ul, secondDiv);
        parent.appendChild(div)
    });

}
const showPopUp = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await res.json();
    console.log(data)
    my_modal.showModal()
    const description = document.getElementById("description");
    const feature = document.getElementById("features");
    const ingredient = document.getElementById("ingredient");
    const basic = document.getElementById("basic");
    const intermid = document.getElementById("intermid");
    const pro = document.getElementById("pro");
    const li = document.createElement("li");
    // const des = document.getElementById("description");
    description.innerText = data.data.description;
    basic.innerText = data.data.pricing[0].plan + "\n" + data.data.pricing[0].price;
    intermid.innerText = data.data.pricing[1].plan + "\n" + data.data.pricing[0].price;
    pro.innerText = data.data.pricing[2].plan + "\n" + data.data.pricing[0].price;

    // console.log(data.data.features["1"].feature_name)
    // console.log(Object.values(data.data.features["1"]));
    for (const d in data.data.features) {
        const li = document.createElement("li");
        li.innerText = data.data.features[d].feature_name;
        feature.appendChild(li);
    }
    data.data.integrations.forEach(value => {
        const li = document.createElement("li");
        li.innerText = value;
        ingredient.appendChild(li);
    })


}
const sortByDate = () => {



}