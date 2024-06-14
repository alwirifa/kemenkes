import React from "react";
import Container from "./Container";

type Props = {};

const TentangKemenkes = (props: Props) => {
  return (
    <Container>
      <section className="bg-white pb-16">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Tentang Kemenkes
        </h2>
        <p className="text-gray-600 mb-4 text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, minus? Similique dignissimos placeat aliquam dolor reprehenderit dicta odio voluptas nobis fuga a sunt pariatur, necessitatibus qui praesentium soluta quibusdam? Esse. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae quas, earum quia placeat aliquam porro nihil officiis sint ipsa veritatis mollitia beatae veniam animi debitis tempora totam voluptas atque suscipit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat exercitationem, libero dolorum itaque optio sapiente aperiam facere quasi ducimus eveniet beatae fugiat tempore possimus accusantium tempora? Eligendi unde rem ipsam?
        </p>
        <ol className="list-decimal list-inside text-gray-600 mb-4">
          <li>
           Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet magnam nemo nobis, porro illo rerum, asperiores mollitia cumque tempora voluptates perspiciatis inventore earum ut ratione quaerat sapiente nisi accusamus magni!
          </li>
          <li>
           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit cumque hic porro. Neque consequuntur praesentium consectetur, atque illo quidem voluptatibus commodi dignissimos ratione dolore explicabo autem aliquam dolor velit distinctio.
          </li>
          <li>
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia eos officiis repudiandae maiores, est fuga suscipit recusandae culpa sed officia doloremque accusantium at dolorem quas porro nobis odit excepturi iusto?
           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos nulla maxime doloremque fugiat blanditiis ab placeat fuga, eligendi totam odio repellendus, porro necessitatibus quisquam beatae tempora corrupti. Illo, neque debitis?
          </li>
        </ol>
      </section>
    </Container>
  );
};

export default TentangKemenkes;
