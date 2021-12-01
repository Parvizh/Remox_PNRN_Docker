import { error } from "console";
import { useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
import CreatePassword from "../../components/import/createPassword";
import Login from "../../components/import/login";
import { useAccountExistMutation } from "../../redux/api";

const Import = () => {
    const [accountExist, { error: reqError, isLoading }] = useAccountExistMutation()
    const [input, setInput] = useState<string>()
    const [index, setIndex] = useState(0)
    const [isError, setError] = useState('')

    const Submitted = async () => {
        if (input) {
            try {
                setError('')
                const data = await accountExist({ phrase: input.trim() }).unwrap()
                if (!data!.result) setIndex(1)
                else setIndex(2)
            } catch (error: any) {
                console.error(error)
                setError(error.data.message)
            }
        }
    }

    return <>
        {index === 0 ? <section className="h-screen flex flex-col items-center justify-center gap-8">
            <div className="text-3xl text-primary">Import Your Recovery Phrase</div>
            <div className="text-greylish">
                Enter your recovery (seed) phrase.
                <br />
                Only import on devices you trust.
            </div>
            <div className="flex flex-col gap-5 justify-center items-center">
                <div>
                    <textarea onChange={(e) => setInput(e.target.value)} className="border-2 p-3 outline-none" placeholder="fish boot hand foot" cols={55} rows={7}></textarea>
                </div>
                {isError && <div className="text-red-500">{isError}</div>}
                <button onClick={Submitted} className="bg-primary text-white px-5 py-2 rounded-xl w-[200px]">{isLoading ? <ClipLoader /> : "Import Account"}</button>
            </div>
        </section>
            :
            input ? index === 1 ? <CreatePassword phrase={input} /> : <Login phrase={input} /> : null
        }

    </>
}

export default Import;