import Image from "next/image";
import LoadingIcon from "../../public/images/loading-2s-200px.gif";

const Loading = () => {
  return (
    <section>
      <div className="loading">
        <Image src={LoadingIcon} alt="loading" width={100} height={100} />
      </div>
    </section>
  );
};

export default Loading;
