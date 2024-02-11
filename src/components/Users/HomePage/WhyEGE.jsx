import React, { Fragment } from 'react'
import './WhyEGE.css'
import Spacer from '../../Common/Spacer'
import { Slide, Zoom } from "react-awesome-reveal";
const WhyEGE = () => {
    return (
        <Fragment>
            <div className='WhyEGE__wrapper'>
                <div className='WhyEGE__headingWrapper'>
                    <Slide>
                        <h5 className='WhyEGE__heading heading__t1'>Why EGE</h5>
                    </Slide>
                </div>
                <Spacer spacing={"4px"} />
                <Zoom>
                    <p className='WhyEGE__info'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, molestias esse debitis ipsa natus animi quibusdam fugiat facilis optio velit itaque veritatis impedit hic. Quos, incidunt optio. Id modi nostrum magni explicabo asperiores possimus quos rem minus officia cupiditate expedita, sit similique nobis qui ullam nam culpa labore architecto ad. Quos autem sit odit itaque sunt pariatur doloremque laboriosam ea, aliquam sequi veniam et consequatur laudantium, enim quod. Illo obcaecati ducimus neque necessitatibus explicabo, alias, laudantium repellat non consequatur, nostrum excepturi earum blanditiis. Ex numquam molestias minima dolorem quia! Laborum nobis dolore quidem? Fugit harum eum officiis ipsa. Perferendis aperiam inventore at modi, aliquam animi ab! Maxime ex magnam voluptatem fugit odit consequuntur sed sunt repellendus repellat, eaque cum veritatis obcaecati cupiditate adipisci nostrum laudantium unde pariatur. Voluptas tenetur animi quisquam iste, pariatur numquam sapiente laborum? Modi ipsum vero, eum quia exercitationem tenetur similique obcaecati consequatur ullam quis corrupti suscipit?
                    </p>
                </Zoom>
            </div>
        </Fragment>
    )
}

export default WhyEGE