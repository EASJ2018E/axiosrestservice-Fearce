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
let addButtonElement = document.getElementById("addButton") as HTMLButtonElement;
let deleteButtonElement = document.getElementById("deleteButton") as HTMLButtonElement;
let deleteAllButtonElement = document.getElementById("deleteAllButton") as HTMLButtonElement;

let modelElement = document.getElementById("addModel") as HTMLInputElement;
let vendorElement = document.getElementById("addVendor") as HTMLInputElement;
let priceElement = document.getElementById("addPrice") as HTMLInputElement;

let deleteElement = document.getElementById("deleteModel") as HTMLInputElement;

buttonElement.addEventListener('click',showAllCars);
addButtonElement.addEventListener("click",addCar);
deleteButtonElement.addEventListener("click",() =>{
    deleteCar(deleteElement.value)
});
deleteAllButtonElement.addEventListener("click",deleteAllCars);



function deleteAllCars(): void{
    axios.get<ICar[]>(uri)
    .then(function (response:AxiosResponse<ICar[]>):void{
        let result:string="<ol>";
        response.data.forEach((car: ICar) =>{
            if (car != null) {
                deleteCar(car.model);
                setTimeout(() => {
                    this.router.navigate(['/']);
                },
                    1000);
            }
           
        });
    })
    .catch(function(error:AxiosError):void{
        document.getElementById("allCars").innerHTML = error.message;
    })
}

function showAllCars(): void{
    axios.get<ICar[]>(uri)
    .then(function (response:AxiosResponse<ICar[]>):void{
        let result:string="<ol>";
        response.data.forEach((car: ICar) =>{
            if (car == null){
                result += "<li>" + "Null Element" + "</li>";
            }
            else{
            result += "<li>"+"Model: " +car.model + " Vendor: "+car.vendor + " Price: " +  car.price.toString() + "</li>";
            }
        });
        result += "</ol>";

        document.getElementById("allCars").innerHTML = result;

    })
    .catch(function(error:AxiosError):void{
        document.getElementById("allCars").innerHTML = error.message;
    })
};

function addCar(): void {
    axios.post(uri,{Model:modelElement.value, Vendor:vendorElement.value, Price:priceElement.value})
    .then((response:AxiosResponse) => {console.log("response " + response.status + " statustext: " + response.statusText)})
    .catch((error:AxiosError) => {console.log("error: " + error.message)});
}

function deleteCar(model: string): void {
    axios.delete(uri + "/" + model)
    .then((response:AxiosResponse) => {console.log("response " + response.status + " statustext: " + response.statusText)})
    .catch((error:AxiosError) => {console.log("error: " + error.message)});
}

function updateCar(): void {
    axios.post(uri,{Model:modelElement.value, Vendor:vendorElement.value, Price:priceElement.value})
}