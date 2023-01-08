import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import '../CSS/CardSkeleton.css'

function CardSkeleton({ cards }) {
    return (
        Array(cards).fill(0).map((_, i) => (
            <SkeletonTheme baseColor="#a9a9a9" highlightColor="#D3D3D3" key={i}>
                <div className='skeleton' >
                    <div className='skeleton__content'>
                        <div className='skeleton__image'>
                            <Skeleton circle width={100} height={100} />
                        </div>
                        <div className='skeleton__info'>
                            <div className='skeleton__name'>
                                <Skeleton count={2} />
                            </div>
                            <div className='skeleton__user'>
                                <div><Skeleton circle width={40} height={40} style={{ marginBottom: 5, marginLeft: 100 }} />

                                    <Skeleton width={250} />
                                </div>
                                <div><Skeleton circle width={40} height={40} style={{ marginBottom: 5, marginLeft: 100 }} />

                                    <Skeleton />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SkeletonTheme >
        ))
    );
}

export default CardSkeleton
