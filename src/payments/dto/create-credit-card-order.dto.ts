// import { ArrayMinSize, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

// export class FormDto {
//     // Validates for a non-empty string
//     // @IsString()
//     // @IsNotEmpty()
//     public name: string;

//     // Gets only validated if it's part of the request's body
//     // @IsString()
//     // @IsNotEmpty()
//     // @IsOptional()
//     public email: string;

//     // Validates for an integer
//     // @IsNumber()
//     public age: number;

//     // Validates for an integer
//     // @IsBoolean()
//     public acceptedTOS: boolean;

//     // Validates for a non-empty integer array
//     // @IsArray()
//     // @IsNumber({ allowNaN: false }, { each: true })
//     // @ArrayMinSize(1)
//     public nums: number[];
// }
// export class createCreditCardOrderDto {
//     public name: string;
//     public email: string;
//     public age: number;
//     public acceptedTOS: boolean;
//     public nums: number[];
// }