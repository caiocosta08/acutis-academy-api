export class CreateCourseDto {
  title: string;
  description: string;
  time?: string;
  site_url?: string;
  price: number;
  // modules: Array; array de módulos
}

export class UpdateCourseDto {
  title: string;
  description: string;
  time?: string;
  site_url?: string;
  price: number;
  // modules: Array; array de módulos
}
