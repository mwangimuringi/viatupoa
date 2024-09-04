import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <div className="">
      <Button asChild>
        <LoginLink>Sign in</LoginLink>
      </Button>
      <Button asChild>
        <RegisterLink>Sign up</RegisterLink>
      </Button>
    </div>
  );
}
