A simple, highly customisable SVG star rating component for React

### Demo

![example](https://res.cloudinary.com/daqk5u0dg/image/upload/v1563327344/example.png)

[code sandbox](https://codesandbox.io/s/0py2xq5zvv)
## Features:
- SVG 
- Customisable star shape.
- Customisable rating increments.
- Customisable colors.
- Customisable number of stars.
- Create read-only stars.

## Usage

### Via NPM

Install via npm:

`npm install react-svg-star-rating`

Then require in your project:

`import StarRating from 'react-svg-star-rating'`

You can then use the following markup in your project:

`<StarRating />`

#### Props

| Prop  | Type | Description | Default |
| ------------- |------------- | ------------- |-------------|
| size?  | number | The size of each star | 30
| count?  | number | The number of star| 5 |
| innerRadius?  | number | The inner radius of star, this is used to customize star shape. (max: 50) | 25 |
| outerRadius? | number | The outer radius of star, this is used to customize star shape. (max: 50) | 50 |
| activeColor?  | string | The color of the active portion of star.  | '#ffd055' |
| hoverColor?  | string | The color of the hover potion of star.  | '#ffebb7' |
| emptyColor?  | string | The color of empty star | '' |
| isHalfRating?  | boolean | When set to true, the rating unit is changed to half star. | false |
| roundedCorner?  | boolean | Whether or not to round the star's corner | false |
| handleOnClick?  | (rating: number) => {} | Returns the rating value. | undefined |
| isReadOnly?  | boolean | When set to true, the rating cannot to be edited. | false |
| initialRating?  | number | The initial rating value. | 0 |
| containerClassName?  | string | A css class name to style star container. | '' |
| starClassName?  | string | A css class name to style each star. | '' |


## License 
 ```code
Copyright 2019 PRNDcompany

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```