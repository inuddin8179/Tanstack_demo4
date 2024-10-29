
import Usefetch from "@/hooks/Usefetch";
import TanstackProvider from "@/providers/TanstackProvider";

export default function Home() {
    return (
        <TanstackProvider>
          <center>
          <h1>Welcome to My App</h1>
          <br />
          <Usefetch/>
          </center>
          
        </TanstackProvider>
    );
}
