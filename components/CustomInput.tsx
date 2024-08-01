import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "@/lib/utils";
import { Control, FieldPath } from "react-hook-form";
import * as z from 'zod' 



const authFormSchema = formSchema('sign-up');
interface CustomForm {
    control: Control <z.infer<typeof authFormSchema>>,
    type: string,
    placeholder: string,
    label: string,
    name: FieldPath<z.infer<typeof authFormSchema>> 
  }


const CustomInput = ({ control, type, placeholder, label,name }: CustomForm) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className=" form-label">{label}</FormLabel>
          <div className=" flex w-full flex-col gap-1">
            <FormControl>
              <Input
                type={type}
                placeholder={placeholder}
                className=" input-class"
                {...field}
              />
            </FormControl>
            <FormMessage className=" form-message"></FormMessage>
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
