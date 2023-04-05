import PageWrapper from "@/layout/PageWrapper";
import BlogAuthor from "@/components/Blog/BlogAuthor";
import BlogHeader from "@/components/Blog/BlogHeader";
import BlogImage from "@/components/Blog/BlogImage";
import BlogContent from "@/components/Blog/BlogContent";
import BlogSubHeading from "@/components/Blog/BlogSubHeading";
import BlogNoteContent from "@/components/Blog/BlogNoteContent";
import BlogLink from "@/components/Blog/BlogLink";
import ContentBold from "@/components/Blog/ContentBold";
import AboutUs from "@/components/Blog/AboutUs";

export default function HowToFindUniqueIdeas() {
	return (
		<PageWrapper blog={true}>
			<BlogAuthor
				avatar={`https://miro.medium.com/v2/resize:fill:176:176/1*QF8ZkVw7TVFwkymlULXeNw.png`}
				username={`Pushpit07`}
				name={`Pushpit`}
				lastUpdated={new Date(2023, 4, 5).toLocaleDateString("en-us", { year: "numeric", month: "short", day: "numeric" })}
			/>
			<BlogHeader>How to find unique ideas?</BlogHeader>
			<BlogImage
				src={"https://miro.medium.com/v2/resize:fit:1400/format:webp/1*7jSpRGJAsQexo4ov9muP9Q.png"}
				alt={"cover art for Buy nft blog"}
				width={768}
				height={400}
			/>
			<BlogContent>
				The Musixverse marketplace facilitates the trade of exclusive Music NFTs. This guide will teach you how to buy an NFT on Musixverse.
			</BlogContent>
			<BlogSubHeading>Prerequisites to Buy an NFT on Musixverse</BlogSubHeading>
			<BlogContent>
				To buy an NFT on Musixverse, you’ll have to set up a crypto wallet first. You can follow this{" "}
				<BlogLink link="https://medium.com/@musixverse/how-to-set-up-a-crypto-wallet-metamask-477be25c0f5f">guide to set up a crypto wallet</BlogLink>
				. NFT transactions happen using cryptocurrency, so you must have sufficient MATIC (a cryptocurrency that Musixverse uses) stored in your wallet
				to buy an NFT.
				<br />
				<br />
				Follow these steps to buy an NFT on Musixverse and get your feet wet in the world of NFTs:
			</BlogContent>
			<BlogSubHeading>Step 1: Browse NFTs on Mx Catalog</BlogSubHeading>
			<BlogContent>
				Mx Catalog is the NFT marketplace of Musixverse and it showcases all the Music NFTs created by the artists. Go to the{" "}
				<BlogLink link="https://www.musixverse.com/mxcatalog/new-releases">Mx Catalog</BlogLink> page and choose the NFT that you want to buy.
				<br />
				<br />
				Make use of all the filters provided on the sidebar to help you choose the right NFT to buy.
			</BlogContent>
			<BlogSubHeading>Step 2: Choose the NFT that You Want to Buy</BlogSubHeading>
			<BlogContent>Click on the NFT that you want to buy and then click on the Buy Now button to proceed further.</BlogContent>
			<BlogSubHeading>Step 3: Confirm the Transaction</BlogSubHeading>
			<BlogContent>
				After you click on Buy Now, <BlogLink link="https://musixverse.com/help-center/blog/how-to-setup-cryptowallet">Metamask</BlogLink>
				/WalletConnect will open up. Review the transaction details and confirm your purchase by paying the required MATIC to complete the transaction!
				<br />
				<br />
				And that’s it! You’ve now purchased your first NFT on Musixverse..
			</BlogContent>
			<BlogNoteContent>
				<ContentBold>Note:</ContentBold> You need to pay for 2 things to buy an NFT:
				<br />
				<br />
				1. The Cost of the NFT: The cost of the NFT is decided by the NFT creator or the collector who is reselling the NFT.
				<br />
				<br />
				2. The Gas Fees: The gas fee is something all users must pay in order to perform any function on the blockchain. As we are operating on the
				Polygon blockchain, the gas fee is as low as $0.01.
			</BlogNoteContent>
			<BlogSubHeading>Enjoy the Privileges of Buying an NFT on Musixverse</BlogSubHeading>
			<BlogContent>
				Buying NFTs on Musixverse comes with multiple privileges including one-on-one connections with the artists. Head over to Mx Catalog to make your
				first purchase!
				<br />
				<br />
				This is your time to support your favorite artists and to be a part of the Indie-Music revolution powered by blockchain!
			</BlogContent>
			<BlogNoteContent>
				<ContentBold>Quick Cool Tip:</ContentBold>
				You can{" "}
				<BlogLink link="https://musixverse.com/help-center/blog/how-to-publish-nft-on-instagram">
					publish your Musixverse NFTs on Instagram
				</BlogLink>{" "}
				too.
			</BlogNoteContent>
			<AboutUs />
		</PageWrapper>
	);
}
