/* eslint-disable */
import { AxiosError } from 'axios';
import { components, type GroupBase, type OptionProps } from 'react-select';
import { AsyncPaginate, type LoadOptions } from 'react-select-async-paginate';
import { toast } from 'sonner';
import type { ReactSelectOption } from '@/04_types/_common/react-select-option';
import type { ServiceBookingDropPointTechnician } from '@/04_types/service/service-booking-drop-point-technician';
import { mainInstance } from '@/07_instances/main-instance';
import { formatName } from '@/lib/user/format-name';

type UserOptionData = {
  value: string;
  label: string;
  technician: string;
};

const UserOption = (props: OptionProps<UserOptionData, false>) => (
  <components.Option {...props}>
    <div className="flex flex-col">
      <h6>{props.data.label}</h6>
      <small className="text-muted-foreground">{props.data.technician}</small>
    </div>
  </components.Option>
);

const DropPointTechnicianSelect = ({ serviceId, ...props }: any) => {
  const loadOptions: LoadOptions<
    UserOptionData,
    GroupBase<UserOptionData>,
    { page: number }
  > = async (searchQuery, _loadedOptions, additional = { page: 1 }) => {
    const page = additional.page || 1;

    try {
      const response = await mainInstance.get(
        `/select/drop-point-technicians?page=${page}&search=${searchQuery}&limit=20&service_id=${serviceId}`,
      );

      const options = response.data.records.map(
        (dropPointTechnician: ServiceBookingDropPointTechnician) => ({
          value: dropPointTechnician.technician_id,
          label: dropPointTechnician.service_booking_drop_point?.location,
          technician: formatName(dropPointTechnician.technician, 'semifull'),
        }),
      );

      return {
        options,
        hasMore: response.data.meta.total_pages > page,
        additional: {
          page: page + 1,
        },
      };
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message || error.message || 'An error occurred',
        );
      } else {
        toast.error('An unknown error occurred');
      }

      return {
        options: [],
        hasMore: false,
      };
    }
  };

  const shouldLoadMore = (
    scrollHeight: number,
    clientHeight: number,
    scrollTop: number,
  ) => {
    return scrollHeight - (scrollTop + clientHeight) < clientHeight * 5;
  };

  return (
    <AsyncPaginate
      className="react-select-container w-full"
      classNamePrefix="react-select"
      loadOptions={loadOptions}
      debounceTimeout={200}
      additional={{
        page: 1,
      }}
      components={{ Option: UserOption }}
      shouldLoadMore={shouldLoadMore}
      {...(props.isMulti && {
        filterOption: (candidate: ReactSelectOption) => {
          const selectedValues = (props.value || []).map(
            (item: ReactSelectOption) => item.value,
          );
          return !selectedValues.includes(candidate.value);
        },
      })}
      {...props}
    />
  );
};

export default DropPointTechnicianSelect;
