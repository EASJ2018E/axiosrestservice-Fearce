import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"

interface ICar {
    model: string;
    vendor: string;
    price: number;
}

var uri = "rest-pele-easj-dk.azurewebsites.dk/api/cars";
