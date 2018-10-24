import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"

interface ICar {
    model: string;
    vendor: string;
    price: number;
}

var uri = "http://rest-pele-easj-dk.azurewebsites.net/api/cars";

let buttonElement = document.getElementById("getAllButton") as HTMLButtonElement;

buttonElement.addEventListener('click',() => {
    
});

function showAllCars():void{
    axios.get<ICar[]>(uri)
    .then(function (response:AxiosResponse<ICar[]>):void{
        let result:string="<ol>";
        response.data.forEach((car: ICar) =>{
            result += "<li>"+"Model: " +car.model + " Vendor: "+car.vendor + " Price: " +  car.price.toString() + "</li>";
        });
        result += "</ol>";

        document.getElementById("allCars").innerHTML = result;

    })
    .catch(function(error:AxiosError):void{
        document.getElementById("allCars").innerHTML = error.message;
    })

};


