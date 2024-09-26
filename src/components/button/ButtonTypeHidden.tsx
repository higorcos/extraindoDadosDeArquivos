import { redirect } from 'next/navigation'

interface ButtonHidden {
  link: string,
  targetBlank: boolean,
  children:React.ReactNode
}

export default function ButtonTypeHidden(props:ButtonHidden) {
  

  const redirectLink = (props:ButtonHidden) => {
    if (props.link != undefined) {
      identificationTarget(props.link, props.targetBlank);
    } else {
      redirect(``) // target == _self
    }
  };

  const identificationTarget = (link:string, blank:boolean) => {
    if (blank != undefined) {
      if (blank == true) {
        window.open(link, "_blank");
      } else {
        redirect(link); // target == _self
      }
    } else {
      redirect(link); // target == _self
    }
  };

  return (
    <>
      <a style={{ cursor: "pointer" }} onClick={() => redirectLink(props)}>
        {props.children}
      </a>
    </>
  );
}
