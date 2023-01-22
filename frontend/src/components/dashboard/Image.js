import {
    Card,
    CardTitle,
    CardSubtitle,
    CardImg,
    CardImgOverlay
} from 'reactstrap';

const Image = (props) => {
    return (
        <Card inverse>
            <CardImg 
                src= {props.src}
                style= {{height: props.height}}
                width= {{width: props.width}}
            />
            <CardImgOverlay>
                <CardTitle tag="h5" style={{color: "red"}}>{props.title}</CardTitle>
                <CardSubtitle className="text-muted" tag="h6">{props.subtitle}</CardSubtitle>
            </CardImgOverlay>
        </Card>
      );
}

export default Image;