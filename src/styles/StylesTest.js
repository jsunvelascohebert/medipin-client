import React from 'react';

export default function StylesTest() {
  return (
    <div className="App">
    <section id="typography">
      <h1 class="text-blue">
        heading h1
      </h1>
      <h2 class="text-green">
        heading h2
      </h2>
      <h3 class="text-red">
        heading h3
      </h3>
      <h4 class="text-orange">
        heading h4
      </h4>
      <h5 class="text-purple">
        heading h5
      </h5>
      <p class="p1">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore perspiciatis doloribus distinctio quia quos fuga quasi necessitatibus consequuntur, consequatur ipsam commodi nostrum maiores adipisci et, quidem quaerat accusamus recusandae soluta.
      </p>
      <p className="p2">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio nemo deserunt dolorem quia doloremque, facilis corrupti ullam excepturi, doloribus fugit, dignissimos autem ducimus commodi in? Recusandae nostrum suscipit soluta et.
      </p>
    </section>
    
    <section id="buttons">
      <button class="btn-blue">blue button</button>
      <button className="btn-green">green button</button>
      <button className="btn-red">red button</button>
      <button className="btn-orange">orange button</button>
      <button className="btn-purple">purple button</button>
    </section>

    <section id="menuItems">
      <a href="#" className="menu-item-blue">blue menu</a>
      <a href="#" className="menu-item-red">red menu</a>
      <a href="#" className="menu-item-green">green menu</a>
      <a href="#" className="menu-item-orange">orange menu</a>
      <a href="#" className="menu-item-purple">purple menu</a>
    </section>
  </div>
  )
}