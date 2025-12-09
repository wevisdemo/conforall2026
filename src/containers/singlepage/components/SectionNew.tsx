import Container from "@/src/components/Container";
import { Post } from "@/src/services/type";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const SectionNew = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://www.ilaw.or.th/wp-json/wp/v2/posts?_embed=wp:featuredmedia&_fields=id,title,link,date,_links.wp:featuredmedia,_embedded.wp:featuredmedia&per_page=10&tags=11029"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
      }
    };

    fetchPosts();
  }, []);

  const getImageUrl = (post: Post) => {
    if (post._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
      return post._embedded["wp:featuredmedia"][0].source_url;
    }
    return "/images/section-new-image.svg";
  };

  return (
    <div className="bg-green-1 py-20">
      <Container className="">
        <div className="flex flex-col gap-10 items-center justify-center">
          <p className="typo-heading-mobile-03 text-neutral text-center">
            ข้อเสนอรัฐธรรมนูญใหม่
          </p>
          <p className="typo-body-03-semibold text-base-100">
            จาก {posts.length} องค์กร
          </p>
        </div>
      </Container>
      <div className="mt-10 md:w-[90vw] w-[90vw] overflow-x-scroll mx-auto">
        <div className="flex gap-2.5 w-max">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-base-100 p-2.5 rounded-[10px] flex flex-col gap-2.5 w-[320px] border-2 border-base-100 hover:border-neutral transition-all cursor-pointer"
              onClick={() => window.open(post.link, "_blank")}
            >
              <Image
                src={getImageUrl(post)}
                alt="Section New Image"
                width={300}
                height={168.75}
                className="h-[168.75px] object-cover"
              />
              <p className="typo-body-03-normal text-neutral">
                {post.title.rendered}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionNew;
