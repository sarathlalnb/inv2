import { Box, Skeleton } from '@mui/material'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function CardSkeleton() {
  return (
    <div>
        <Container className="mt-5">
          <Row>
            <Col>
              <Box sx={{ width: 300 }}>
                <Skeleton
                  variant="rectangular"
                  width={400}
                  height={200}
                  animation="wave"
                />
                <Skeleton animation={false} />
                <Skeleton width="60%" />
              </Box>
            </Col>
            <Col>
              <Box sx={{ width: 300 }}>
                <Skeleton
                  variant="rectangular"
                  width={400}
                  height={200}
                  animation="wave"
                />
                <Skeleton animation={false} />
                <Skeleton width="60%" />
              </Box>
            </Col>
            <Col>
              <Box sx={{ width: 300 }}>
                <Skeleton
                  variant="rectangular"
                  width={400}
                  height={200}
                  animation="wave"
                />
                <Skeleton animation={false} />
                <Skeleton width="60%" />
              </Box>
            </Col>
           
          </Row>
          <Row>
            <Col>
              <Box sx={{ width: 300 }}>
                <Skeleton
                  variant="rectangular"
                  width={400}
                  height={200}
                  animation="wave"
                />
                <Skeleton animation={false} />
                <Skeleton width="60%" />
              </Box>
            </Col>
            <Col>
              <Box sx={{ width: 300 }}>
                <Skeleton
                  variant="rectangular"
                  width={400}
                  height={200}
                  animation="wave"
                />
                <Skeleton animation={false} />
                <Skeleton width="60%" />
              </Box>
            </Col>
            <Col>
              <Box sx={{ width: 300 }}>
                <Skeleton
                  variant="rectangular"
                  width={400}
                  height={200}
                  animation="wave"
                />
                <Skeleton animation={false} />
                <Skeleton width="60%" />
              </Box>
            </Col>
           
          </Row>
        </Container>
    </div>
  )
}

export default CardSkeleton