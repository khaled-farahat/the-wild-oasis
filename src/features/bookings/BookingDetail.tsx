import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import BookingDataBox from "./BookingDataBox";
import { useBooking } from "./useBooking";
import Row from "@/ui/Row";
import Heading from "@/ui/Heading";
import Tag from "@/ui/Tag";
import ButtonGroup from "@/ui/ButtonGroup";
import Button from "@/ui/Button";
import ButtonText from "@/ui/ButtonText";
import Spinner from "@/ui/Spinner";

import { useMoveBack } from "@/hooks/useMoveBack";
import { useCheckout } from "@/features/check-in-out/useCheckout";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const statusToTagName: Record<string, string> = {
  unconfirmed: "blue",
  "checked-in": "green",
  "checked-out": "silver",
};

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();

  const navigate = useNavigate();

  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;

  const { status, id: bookingId } = booking || {};

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status ?? ""]}>
            {status?.replace("-", " ")}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking ?? undefined} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}

        {status === "checked-in" && (
          <Button
            onClick={() => checkout(Number(bookingId))}
            disabled={isCheckingOut}
          >
            Check out
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
