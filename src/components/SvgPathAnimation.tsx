import React, { useCallback } from "react";
import "./SvgPathAnimation.css";
import { motion } from "framer-motion";
import SvgButton from "./SvgButton";
import { useNavigate } from "react-router-dom";

const icon = {
  hidden: {
    pathLength: 0,
    fill: "rgba(255, 255, 255, 0)",
  },
};

const SvgPathAnimation = () => {
  const navigate = useNavigate();
  const onButtonClick = useCallback(
    (pageId: any) => {
      navigate(pageId);
    },
    [navigate]
  );

  const [scrollProgress, setScrollProgress] = React.useState(0);

  const obj3dSvg = (<motion.svg
    width="300"
    height="349"
    viewBox="0 0 300 349"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="obj3d"
  >
    <motion.path
      d="M38 111V239L150 287V159"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M150 159L38 111L150 63L262 111"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M150 287L262 239V111L150 159"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M74.4 163.8L111.733 178.2L78.1333 187.8C85.2889 189.4 108 195 105.2 211.8C102.13 230.221 67.8666 224.6 64.1333 203.8"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M181.733 235.081V167.881C187.333 165.747 200.773 162.121 209.733 164.681C220.933 167.881 228.4 174.281 229.333 186.281C230.267 198.281 222.8 215.881 209.733 223.881C199.28 230.281 186.711 234.014 181.733 235.081Z"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
  </motion.svg>
  );
  const aiSvg = (<motion.svg
    width="300"
    height="349"
    viewBox="0 0 300 349"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="ai"
  >
    <motion.path
      d="M96.9688 216.489V125.982H186.19V216.489H96.9688Z"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M107.743 202.384V140.087H173.733V202.384H107.743Z"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M119.527 189.846L126.597 153.016L134.004 189.846"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M121.884 176.525H131.311"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M144.105 155.367H159.592"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M152.186 156.151V187.495"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M159.592 186.712H145.115"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M118.18 125.981V83.6662L102.019 72.6955V54.6723M102.019 54.6723C103.703 54.2805 108.079 54.2805 108.753 48.4034C109.42 42.5778 106.059 39 102.019 39C97.979 39 94.949 42.9181 95.6223 48.7952C96.1636 53.5199 99.999 54.2805 102.019 54.6723Z"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M170.797 125.59V105.216L183.834 93.4614V75.4382M183.834 75.4382C185.517 75.0464 189.894 75.0464 190.567 69.1693C191.235 63.3437 187.874 59.7659 183.833 59.7659C179.793 59.7659 176.763 63.684 177.437 69.5611C177.978 74.2858 181.813 75.0464 183.834 75.4382Z"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M133.761 126.373V108.35M133.761 108.35C135.445 107.958 139.822 107.958 140.495 102.081C141.162 96.2556 137.802 92.6777 133.761 92.6777C129.721 92.6777 126.691 96.5958 127.364 102.473C127.906 107.198 131.741 107.958 133.761 108.35Z"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M158.676 125.981L158.676 93.4614M158.676 93.4614C160.36 93.0696 164.737 93.0696 165.41 87.1925C166.077 81.3669 162.717 77.7891 158.676 77.7891C154.636 77.7891 151.606 81.7071 152.279 87.5843C152.821 92.309 156.656 93.0696 158.676 93.4614Z"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M186.528 140.196H204.372L212.452 119.321L235.347 119.321M235.347 119.321C235.684 121.28 235.684 126.373 240.734 127.157C245.74 127.934 248.814 124.023 248.814 119.321C248.814 114.619 245.448 111.093 240.397 111.877C236.337 112.506 235.684 116.97 235.347 119.321Z"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M186.527 193.373L215.482 193.373L246.794 207.651L269.688 207.651M269.688 207.651C270.025 209.61 270.025 214.703 275.075 215.487C280.081 216.264 283.156 212.353 283.156 207.651C283.156 202.949 279.789 199.423 274.739 200.207C270.679 200.837 270.025 205.3 269.688 207.651Z"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M186.527 161.854L234 161.854L264.638 126.874L287.533 126.874M287.533 126.874C287.869 128.833 287.869 133.927 292.92 134.71C297.926 135.487 301 131.576 301 126.874C301 122.173 297.633 118.647 292.583 119.43C288.523 120.06 287.869 124.523 287.533 126.874Z"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M186.528 178.593L209.422 178.593M209.422 178.593C209.759 180.552 209.759 185.646 214.809 186.429C219.815 187.206 222.89 183.295 222.89 178.593C222.89 173.891 219.523 170.365 214.473 171.149C210.413 171.779 209.759 176.242 209.422 178.593Z"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M97.6471 204.724L79.8028 204.73L71.7178 216.881L48.8232 216.888M48.8232 216.888C48.4861 214.929 48.485 209.836 43.4345 209.053C38.4284 208.278 35.3548 212.19 35.3558 216.892C35.3568 221.594 38.7244 225.119 43.7745 224.334C47.8344 223.703 48.487 219.239 48.8232 216.888Z"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M97.634 142.319L68.6791 142.327L37.3641 128.057L14.4695 128.064M14.4695 128.064C14.1324 126.105 14.1312 121.012 9.08072 120.229C4.07457 119.454 1.001 123.366 1.00209 128.068C1.00317 132.769 4.37083 136.295 9.42092 135.51C13.4808 134.879 14.1333 130.415 14.4695 128.064Z"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M97.6425 183.066L65.6572 183.066L52.8632 200.817L15.4912 200.813M15.4912 200.813C15.154 198.854 15.1529 193.761 10.1025 192.978C5.09634 192.203 2.02273 196.115 2.02375 200.817C2.02477 205.519 5.39238 209.044 10.4425 208.259C14.5024 207.628 15.155 203.164 15.4912 200.813Z"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M97.639 166.327L45.4565 166.334M45.4565 166.334C45.1194 164.375 45.1183 159.282 40.0678 158.499C35.0617 157.724 31.9881 161.636 31.9891 166.338C31.9901 171.04 35.3577 174.565 40.4078 173.78C44.4677 173.149 45.1203 168.685 45.4565 166.334Z"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M179.537 216.881L179.334 259.196L195.442 270.271L195.356 288.294M195.356 288.294C193.671 288.675 189.294 288.646 188.592 294.519C187.897 300.34 191.241 303.94 195.281 303.966C199.321 303.992 202.37 300.094 201.724 294.213C201.206 289.484 197.374 288.699 195.356 288.294Z"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M107.039 217.01L106.942 237.384L93.8488 249.053L93.7624 267.076M93.7624 267.076C92.0772 267.457 87.7004 267.428 86.9989 273.301C86.3035 279.122 89.6471 282.722 93.6872 282.748C97.7274 282.774 100.776 278.876 100.131 272.995C99.6124 268.266 95.7807 267.481 93.7624 267.076Z"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M167.246 216.142L167.16 234.165M167.16 234.165C165.474 234.545 161.098 234.517 160.396 240.39C159.701 246.211 163.044 249.81 167.084 249.837C171.125 249.863 174.173 245.965 173.528 240.083C173.01 235.355 169.178 234.569 167.16 234.165Z"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M148.462 216.142L148.306 248.661M148.306 248.661C146.62 249.042 142.244 249.014 141.542 254.886C140.847 260.708 144.19 264.307 148.23 264.333C152.271 264.36 155.319 260.461 154.674 254.58C154.156 249.852 150.324 249.066 148.306 248.661Z"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M116.657 294.851L116.743 267.552L129.836 255.882L129.934 235.509L123.026 227.152L123.026 216.181M116.657 294.851C114.972 295.232 110.595 295.203 109.893 301.076C109.198 306.897 112.541 310.497 116.582 310.523C120.622 310.549 123.671 306.651 123.025 300.77C122.507 296.041 118.675 295.256 116.657 294.851Z"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M227.853 274.477L227.939 256.454L227.94 230.594L211.442 209.045L186.527 209.045M227.853 274.477C226.168 274.857 221.791 274.829 221.089 280.702C220.394 286.523 223.738 290.122 227.778 290.149C231.818 290.175 234.867 286.277 234.222 280.395C233.703 275.667 229.871 274.881 227.853 274.477Z"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M106.396 125.198L106.396 106.281L82.1544 90.0581L61.9549 90.0581M61.9549 90.0581C61.6178 88.0993 61.6167 83.0058 56.5662 82.2237C51.5601 81.4484 48.4865 85.3604 48.4875 90.0621C48.4885 94.7638 51.8561 98.289 56.9062 97.5039C60.9661 96.8728 61.6187 92.4092 61.9549 90.0581Z"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
  </motion.svg>
  );
  const digitalartSvg = (<motion.svg
    width="300"
    height="349"
    viewBox="0 0 300 349"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="digitalart"
  >
    <motion.path
      d="M165.675 214.273C159.466 214.273 137.115 216.134 106.693 209.31C62.4039 199.375 1.76676 176.428 94.8964 119.35C116.627 104.451 184.922 87.7089 207.273 92.6719M202.927 206.207C237.074 198.142 255.966 178.289 253.838 163.399C250.501 140.06 227.905 147.889 227.141 137.962C226.377 128.035 247.629 118.729 247.629 108.803C247.629 98.8763 229.831 95.9811 225.278 94.5334"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M75.65 165.26C72.585 159.135 74.4086 152.852 81.2382 150.371C82.946 149.75 90.0546 148.509 93.0348 153.473C96.76 159.677 95.1013 165.544 89.9305 168.362C86.205 170.393 78.247 170.451 75.65 165.26Z"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M110.614 140.429C107.549 134.304 109.373 128.021 116.203 125.539C117.91 124.919 125.019 123.678 127.999 128.641C131.724 134.846 130.066 140.713 124.895 143.531C121.169 145.562 113.211 145.619 110.614 140.429Z"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M150.349 124.298C147.284 118.173 149.108 111.89 155.937 109.409C157.645 108.788 164.754 107.547 167.734 112.511C171.459 118.715 169.801 124.582 164.63 127.401C160.904 129.431 152.946 129.489 150.349 124.298Z"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M225.142 68.3528C215.246 78.0142 193.257 107.892 184.47 150.112C181.696 168.771 181.564 196.539 203.23 158.343C224.896 120.148 226.865 82.4348 225.142 68.3528Z"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M185.898 145.318C185.953 148.279 187.315 154.748 192.317 156.943C197.32 159.138 203.387 155.928 205.795 154.048"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M182.778 166.309C163.893 172.252 155.85 178.21 157.569 195.904C159.287 213.597 172.861 218.198 167.869 229.559C162.877 240.92 190.304 227.884 199.678 209.636C209.052 191.389 203.312 176.674 196.033 170.093"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M101.727 241.571V285"
      strokeWidth="5"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M111.66 241.571V285"
      strokeWidth="1"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M115.385 241.571V285"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M135.253 241.571V285"
      strokeWidth="5"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M145.187 241.571V285"
      strokeWidth="1"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M148.912 241.571V285"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M124.077 241.571V285"
      strokeWidth="7"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M179.955 241.571V285"
      strokeWidth="4"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M158.846 241.571V285"
      strokeWidth="1"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M130.286 241.571V285"
      strokeWidth="1"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M163.191 241.571V285"
      strokeWidth="1"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M172.504 241.571V285"
      strokeWidth="0.5"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M186.164 241.571V285"
      strokeWidth="0.5"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M194.855 241.571V285"
      strokeWidth="12"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M141.461 241.571V285"
      strokeWidth="1"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M153.879 241.571V285"
      strokeWidth="5"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M165.054 241.571V285"
      strokeWidth="0.25"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M167.538 241.571V285"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M170.021 241.571V285"
      strokeWidth="1"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M203.548 241.571V285"
      strokeWidth="1"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M212.861 241.571V285"
      strokeWidth="0.5"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M207.273 241.571V285"
      strokeWidth="0.5"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M214.724 241.571V285"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M210.999 241.571V285"
      strokeWidth="1"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M206.031 241.571V285"
      strokeWidth="0.5"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M208.515 241.571V285"
      strokeWidth="0.5"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M105.452 241.571V285"
      strokeWidth="0.5"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M107.935 241.571V285"
      strokeWidth="0.25"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M142.703 241.571V285"
      strokeWidth="0.25"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M143.945 241.571V285"
      strokeWidth="0.25"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
  </motion.svg>
  );
  const programsSvg = (<motion.svg
    width="300"
    height="349"
    viewBox="0 0 300 349"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="programs"
  >
    <motion.path
      d="M1 230V65H301V230H1Z"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M123.687 208L172.941 88.8334"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M214.971 107.69L264.224 144.357L214.971 189.274"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M85.1675 188.881L36.6817 151.157L86.8516 107.315"
      strokeWidth="2"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M154.134 230V285"
      strokeWidth="10"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M18.9111 284.083H280.404"
      strokeWidth="10"
      variants={icon}
      initial="hidden"
      animate={{ pathLength: scrollProgress }}
      transition={{ duration: 0.5 }}
    />
  </motion.svg>
  );

  // Calculate scroll progress and update state
  const handleScroll = () => {
    const scrollY = window.scrollY;
    // console.log(Math.round(scrollY));
    const maxScroll = 3160; // Adjust as needed
    let progress = 0;
    // Apply min max scaling so that scroll dependent animation begins from the start of the page
    if (scrollY >= 1560) {
      progress = Math.min((scrollY - 1560) / (maxScroll - 1560), 1); // Ensure progress is between 0 and 1
    }
    setScrollProgress(progress);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="container">
      <div className="obj3d-container-whole">
        <div className="obj3d-container">
          {obj3dSvg}
        </div>
        <SvgButton onClick={() => onButtonClick("/env3d")} svg={obj3dSvg} />
      </div>
      <div className="ai-container-whole">
        <div className="ai-container">
          {aiSvg}
        </div>
        <SvgButton onClick={() => onButtonClick("/ai")} svg={aiSvg} />
      </div>
      <div className="digitalart-container-whole">
        <div className="digitalart-container">
          {digitalartSvg}
        </div>
        <SvgButton onClick={() => onButtonClick("/digitalart")} svg={digitalartSvg} />
      </div>
      <div className="programs-container-whole">
        <div className="programs-container">
          {programsSvg}
        </div>
        <SvgButton onClick={() => onButtonClick("/programs")} svg={programsSvg} />
      </div>
    </div>
  );
};

export default SvgPathAnimation;
